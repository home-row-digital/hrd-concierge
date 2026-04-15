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

    const [configQuery, existingCall] = await Promise.all([
      payload.find({
        collection: 'provider-configs',
        where: { twilioSubAccountSid: { equals: accountSid } },
        limit: 1,
      }),
      payload.find({
        collection: 'voice-logs',
        where: { callSid: { equals: callSid } },
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

    let voiceLogId;

    if (existingCall.docs.length > 0) {
      voiceLogId = existingCall.docs[0].id;
    } else {
      // New call; create log & lead
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
      voiceLogId = voiceLog.id;

      const leadQuery = await payload.find({
        collection: 'leads',
        where: {
          and: [{ brand: { equals: brandId } }, { phoneNumber: { equals: from } }],
        },
        limit: 1,
      });

      if (leadQuery.docs.length === 0) {
        await payload.create({
          collection: 'leads',
          data: {
            brand: brandId,
            phoneNumber: from,
            status: 'LEAD',
            subStatus: 'NEW',
          },
        });
      }
    }

    const personaQuery = await payload.find({
      collection: 'personas',
      where: { brand: { equals: brandId } },
      limit: 1,
    });
    const personaId = String(personaQuery.docs[0]?.id || '');

    const host = req.headers.get('host');
    const isLocal = host?.includes('localhost') || host?.includes('127.0.0.1');
    const protocol = isLocal ? 'ws' : 'wss';
    const wsUrl = `${protocol}://${host}/api/voice/stream`;

    const response = new VoiceResponse();
    const connect = response.connect();

    const relay = connect.conversationRelay({ url: wsUrl });
    relay.parameter({ name: 'personaId', value: String(personaId) });
    relay.parameter({ name: 'voiceLogId', value: String(voiceLogId) });

    return new NextResponse(response.toString(), {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new NextResponse('<Response><Say>A system error occurred.</Say><Hangup/></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
