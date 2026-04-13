import { getPayloadClient } from '@/services/payload/getPayloadClient';
import twilio from 'twilio';
import { NextResponse } from 'next/server';

const VoiceResponse = twilio.twiml.VoiceResponse;

export async function POST(req: Request) {
  const formData = await req.formData();
  const to = formData.get('To') as string;
  const from = formData.get('From') as string;
  const callSid = formData.get('CallSid') as string;
  const accountSid = formData.get('AccountSid') as string;

  const payload = await getPayloadClient();
  const response = new VoiceResponse();

  try {
    // Find the ProviderConfig using the AccountSid
    const configQuery = await payload.find({
      collection: 'provider-configs',
      where: { twilioSubAccountSid: { equals: accountSid } },
      limit: 1,
    });

    if (!configQuery.docs.length) {
      response.reject();
      return new NextResponse(response.toString(), { headers: { 'Content-Type': 'text/xml' } });
    }

    const brandId =
      typeof configQuery.docs[0].brand === 'object'
        ? configQuery.docs[0].brand.id
        : configQuery.docs[0].brand;

    // Find the Campaign via the number
    const numberDoc = await payload.find({
      collection: 'twilio-numbers',
      where: { phoneNumber: { equals: to } },
      limit: 1,
    });

    const campaignId = numberDoc.docs[0]?.campaign
      ? typeof numberDoc.docs[0].campaign === 'object'
        ? numberDoc.docs[0].campaign.id
        : numberDoc.docs[0].campaign
      : null;

    // Parallel fetch the Brand and Persona using the Brand ID we got from Config
    const [brand, persona] = await Promise.all([
      payload.findByID({ collection: 'brands', id: brandId }),
      payload.find({
        collection: 'personas',
        where: { brand: { equals: brandId } },
        limit: 1,
      }),
    ]);

    // Emergency halt & health checks
    if (brand.emergencyHalt || brand.healthStatus === 'Warning') {
      response.say('We are currently experiencing technical difficulties. Please try again later.');
      response.hangup();
      return new NextResponse(response.toString(), { headers: { 'Content-Type': 'text/xml' } });
    }

    // Lead Auto-Identification / Creation
    const leadQuery = await payload.find({
      collection: 'leads',
      where: {
        and: [{ brand: { equals: brandId } }, { phoneNumber: { equals: from } }],
      },
      limit: 1,
    });

    let leadId = leadQuery.docs[0]?.id;
    if (!leadId) {
      const newLead = await payload.create({
        collection: 'leads',
        data: {
          brand: brandId,
          phoneNumber: from,
          status: 'LEAD',
          subStatus: 'NEW',
        },
      });
      leadId = newLead.id;
    }

    // Create Activity Ledger entries
    const voiceLog = await payload.create({
      collection: 'voice-logs',
      data: {
        callSid,
        campaign: campaignId,
        callType: 'AI_ASSISTANT',
        status: 'RINGING',
        direction: 'INBOUND',
        from,
        to,
      },
    });

    await payload.create({
      collection: 'lead-activity',
      data: {
        lead: leadId,
        type: 'CALL',
        description: `Incoming AI voice call started.`,
        referenceId: callSid,
      },
    });

    // CONNECT THE STREAM
    const relay = response.connect().conversationRelay({
      url: `wss://${req.headers.get('host')}/api/voice/stream`,
    });

    // Pass parameters to the Stream
    relay.parameter({ name: 'personaId', value: persona.docs[0]?.id.toString() });
    relay.parameter({ name: 'brandId', value: brandId.toString() });
    relay.parameter({ name: 'leadId', value: leadId.toString() });
    relay.parameter({ name: 'voiceLogId', value: voiceLog.id.toString() });

    return new NextResponse(response.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (error) {
    console.error('CRITICAL VOICE ERROR:', error);
    const errorResponse = new VoiceResponse();
    errorResponse.say('System Error.');
    return new NextResponse(errorResponse.toString(), { headers: { 'Content-Type': 'text/xml' } });
  }
}
