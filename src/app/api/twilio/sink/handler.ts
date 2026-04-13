import { getPayloadClient } from '@/services/payload/getPayloadClient';

export async function handleTwilioEvent(type: string, data: any, accountSid: string) {
  const payload = await getPayloadClient();

  const configQuery = await payload.find({
    collection: 'provider-configs',
    where: { twilioAccountSid: { equals: accountSid } },
    limit: 1,
  });

  if (!configQuery.docs.length) {
    console.warn(`[TWILIO EVENT] No brand config found for SID: ${accountSid}`);
    return;
  }

  const brandId =
    typeof configQuery.docs[0].brand === 'object'
      ? configQuery.docs[0].brand.id
      : configQuery.docs[0].brand;

  switch (type) {
    // BRAND REGISTRATION (Compliance & Legal)
    case 'com.twilio.trusthub.customer_profile.approved':
    case 'com.twilio.trusthub.customer_profile.rejected':
    case 'com.twilio.messaging.brand_registration.approved':
    case 'com.twilio.messaging.brand_registration.failed':
      const isBrandApproved = type.includes('approved');

      // Update BrandMetrics collection
      await payload.update({
        collection: 'brand-metrics',
        where: { brandId: { equals: brandId } },
        data: {
          brandStatus: isBrandApproved ? 'APPROVED' : 'FAILED',
          vettingError: data.failure_reason || (isBrandApproved ? '' : 'Compliance rejection'),
          trustScore: data.trust_score || 0,
        },
      });

      // Update Brands collection - ONLY on critical failure
      if (!isBrandApproved) {
        await payload.update({
          collection: 'brands',
          id: brandId,
          data: {
            healthStatus: 'Warning',
            emergencyHalt: true,
          },
        });
      }

      break;

    // --- CAMPAIGN (10DLC) STATUS ---
    case 'com.twilio.messaging.campaign.approved':
    case 'com.twilio.messaging.campaign.rejected':
      const isCampApproved = type.includes('approved');

      // Update Campaigns
      await payload.update({
        collection: 'campaigns',
        where: { tcrCampaignSid: { equals: data.campaign_sid } },
        data: {
          campaignStatus: isCampApproved ? 'VERIFIED' : 'FAILED',
        },
      });
      break;

    // --- VOICE EVENTS (Sarah's Lifecycle) ---
    case 'com.twilio.voice.call.initiated':
      // @TODO: LOG THAT THE CALL STARTED RINGING
      break;

    case 'com.twilio.voice.call.completed':
      await payload.update({
        collection: 'voice-logs',
        where: { callSid: { equals: data.call_sid } },
        data: {
          status: 'COMPLETED',
          duration: parseInt(data.call_duration || '0'),
          // Convert price to cents and ensure positive integer
          usageCost: data.price ? Math.abs(Math.round(parseFloat(data.price) * 100)) : 0,
        },
      });
      break;

    // --- MESSAGING & CARRIER FILTERING ---
    case 'com.twilio.messaging.message.undelivered':
    case 'com.twilio.messaging.message.failed':
      // 30007 is the "Death Sentence" - Carrier Filtering
      if (data.error_code === '30007') {
        await payload.update({
          collection: 'brands',
          id: brandId,
          data: { healthStatus: 'Warning' },
        });
      }

      // Update the Log
      await payload.update({
        collection: 'sms-logs',
        where: { messageSid: { equals: data.message_sid } },
        data: {
          status: 'UNDELIVERABLE',
          totalCost: data.price ? Math.abs(parseFloat(data.price) * 100) : 0,
        },
      });
      break;

    // --- OPT-OUTS & CONSENT ---
    case 'com.twilio.messaging.message.delivered':
      const body = data.body?.toUpperCase() || '';
      const stopKeywords = ['STOP', 'QUIT', 'UNSUBSCRIBE', 'OPT OUT'];

      // If a stop keyword is detected, log it
      if (stopKeywords.some((keyword) => body.includes(keyword))) {
        await payload.create({
          collection: 'consent-logs',
          data: {
            phoneNumber: data.from,
            brand: brandId,
            type: 'OPT_OUT',
            source: 'SMS_KEYWORD',
            consentDate: new Date().toISOString(),
            rawTextSnapshot: data.body,
            // Lookup key for unique validation in Payload
            lookupKey: `${data.from}_${brandId}`,
          },
        });

        // Trigger an emergency halt for this specific lead in the Leads collection
        await payload.update({
          collection: 'leads',
          where: { phoneNumber: { equals: data.from }, brand: { equals: brandId } },
          data: { status: 'OPTED_OUT', doNotCall: true },
        });
      }

      break;

    default:
      console.log(`[TWILIO EVENT] Unhandled type: ${type}`);
  }
}
