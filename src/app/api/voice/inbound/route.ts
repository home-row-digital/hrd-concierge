import { getPayloadClient } from '@/services/payload/getPayloadClient';
import twilio from 'twilio';
import { NextResponse } from 'next/server';

const VoiceResponse = twilio.twiml.VoiceResponse;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const accountSid = formData.get('AccountSid') as string;

    /* --- PAYLOAD LOGIC (COMMENTED OUT FOR TESTING) ---
    const payload = await getPayloadClient();
    const configQuery = await payload.find({
      collection: 'provider-configs',
      where: { twilioSubAccountSid: { equals: accountSid } },
      limit: 1,
    });
    const brand = configQuery.docs[0]?.brand;
    const voiceLog = await payload.create({
      collection: 'voice-logs',
      data: { 
        callSid: formData.get('CallSid'), 
        callType: 'AI_ASSISTANT', 
        status: 'IN_PROGRESS', 
        from: formData.get('From'), 
        to: formData.get('To') 
      },
    });
    -------------------------------------------------- */

    const response = new VoiceResponse();
    const connect = response.connect();

    // Ensure this matches the pathname in server.ts
    const wsUrl = `wss://voice.homerowdigital.com/api/voice/stream`;

    const relay = connect.conversationRelay({
      url: wsUrl,
      dtmfDetection: true,
    });

    // Dummy ID for testing while Payload is commented out
    relay.parameter({ name: 'voiceLogId', value: 'TEST_MODE' });

    return new NextResponse(response.toString(), {
      headers: { 'Content-Type': 'text/xml', 'Cache-Control': 'no-cache' },
    });
  } catch (error) {
    console.error('Inbound Error:', error);
    return new NextResponse('<Response><Say>Error</Say><Hangup/></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
