import { getPayloadClient } from '@/services/payload/getPayloadClient';
import twilio from 'twilio';
import { NextResponse } from 'next/server';

const VoiceResponse = twilio.twiml.VoiceResponse;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const to = formData.get('To') as string;
    const from = formData.get('From') as string;
    const callSid = formData.get('CallSid') as string;
    const accountSid = formData.get('AccountSid') as string;

    const payload = await getPayloadClient();

    // Check if the call already exists
    const existingCall = await payload.find({
      collection: 'voice-logs',
      where: { callSid: { equals: { callSid } } },
    });
    if (existingCall.docs.length > 0) {
      return new NextResponse(null, { status: 200 });
    }

    // Get brand config and campaign
    const [configQuery, numberDoc] = await Promise.all([
      payload.find({
        collection: 'provider-configs',
        where: { twilioSubAccountSid: { equals: accountSid } },
        limit: 1,
      }),
      payload.find({
        collection: 'twilio-numbers',
        where: { phoneNumber: { equals: to } },
        limit: 1,
      }),
    ]);

    const brand = typeof configQuery.docs[0].brand === 'object' ? configQuery.docs[0].brand : null;
    const brandId = brand?.id;

    if (!brand || !brandId || brand.emergencyHalt) {
      const response = new VoiceResponse();
      response.say('We are currently unavailable. Please try again later.');
      response.hangup();
      return new NextResponse(response.toString(), { headers: { 'Content-Type': 'text/xml' } });
    }

    // Fetch Persona and Lead
    const [personaQuery, leadQuery] = await Promise.all([
      payload.find({
        collection: 'personas',
        where: { brand: { equals: brandId } },
        limit: 1,
      }),
      payload.find({
        collection: 'leads',
        where: { and: [{ brand: { equals: brandId } }, { phoneNumber: { equals: from } }] },
        limit: 1,
      }),
    ]);

    let leadId = typeof leadQuery.docs[0] === 'object' ? leadQuery.docs[0].id : null;
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

    const voiceLog = await payload.create({
      collection: 'voice-logs',
      data: {
        callSid,
        callType: 'AI_ASSISTANT',
        status: 'IN_PROGRESS',
        direction: 'INBOUND',
        from,
        to,
      },
    });

    const response = new VoiceResponse();
    const host = req.headers.get('host');
    const protocol = host?.includes('localhost') ? 'ws' : 'wss';
    const wsUrl = `${protocol}://${host}/api/voice/stream`;

    const connect = await response.connect();
    const relay = connect.conversationRelay({
      url: wsUrl,
      welcomeGreeting: 'Hello!',
    });

    // Pass parameters to the Stream
    relay.parameter({ name: 'personaId', value: String(personaQuery.docs[0]?.id) });
    relay.parameter({ name: 'voiceLogId', value: String(voiceLog.id) });

    return new NextResponse(response.toString(), { headers: { 'Content-Type': 'text/xml' } });
  } catch (error) {
    console.error('CRITICAL VOICE ERROR:', error);
    return new NextResponse('<Response><Hangup/></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
