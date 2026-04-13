import { getPayloadClient } from '@/services/payload/getPayloadClient';

export async function handleTwilioEvent(type: string, data: any, accountSid: string) {
  const payload = await getPayloadClient();

  const configQuery = await payload.find({
    collection: 'provider-configs',
    where: { twilioAccountSid: { equals: accountSid } },
    limit: 1,
  });

  if (!configQuery.docs.length) return;
  const brandId =
    typeof configQuery.docs[0].brand === 'object'
      ? configQuery.docs[0].brand.id
      : configQuery.docs[0].brand;

  switch (type) {
    // BRAND REGISTRATION (Compliance & Legal)
    case 'com.twilio.messaging.brand_registration.failed':
    case 'com.twilio.messaging.brand_registration.approved':
      const isBrandApproved = type.includes('approved');

      // Update BrandMetrics collection
      await payload.update({
        collection: 'brand-metrics',
        where: { brandId: { equals: brandId } },
        data: {
          brandStatus: isBrandApproved ? 'APPROVED' : 'FAILED',
          vettingError: data.failure_reason || (isBrandApproved ? '' : 'Vetting failed'),
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

    // CAMPAIGN COMPLIANCE
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

    // CARRIER FILTERING & SMS LOGS
    case 'com.twilio.messaging.message.undelivered':
      // Carrier Filtering (30007) is the autonomy trigger
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

    // OPT-OUTS
    case 'com.twilio.messaging.message.delivered':
      // If a stop keyword is detected, log it
      if (data.body?.toUpperCase().includes('STOP')) {
        await payload.create({
          collection: 'consent-logs',
          data: {
            phoneNumber: data.From,
            brand: brandId,
            type: 'OPT_OUT',
            source: 'SMS_KEYWORD',
            consentDate: new Date().toISOString(),
            rawTextSnapshot: data.body,
            lookupKey: `${data.From}_${brandId}`,
          },
        });
      }
  }
}
