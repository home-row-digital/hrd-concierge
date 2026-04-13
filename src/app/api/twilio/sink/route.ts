import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { getPayloadClient } from '@/services/payload/getPayloadClient';
import { select } from 'payload/shared';
import { Brand } from '@/payload-types';

export async function POST(req: Request) {
  const signature = req.headers.get('x-twilio-signature');
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const rawBody = await req.text();
  const url = process.env.NEXT_PUBLIC_SITE_URL + '/api/twilio/sink';

  // Validate the request to ensure it comes from Twilio
  const isValid = twilio.validateRequestWithBody(authToken, signature || '', url, rawBody);

  if (!isValid && process.env.NODE_ENV === 'production') {
    return new Response('Invalid Signature', { status: 401 });
  }

  const payload = await getPayloadClient();

  // Parse & process events
  const events = JSON.parse(rawBody);

  for (const event of events) {
    const { type, data, account_sid } = event;

    // Get Brand ID from Twilio Subaccount SID
    const providerConfig = await payload.find({
      collection: 'provider-configs',
      where: { twilioSubAccountSid: { equals: account_sid } },
      select: {
        twilioSubAccountSid: true,
        brand: true,
      },
    });

    if (!providerConfig.docs.length) continue;

    // Get brand ID
    const brandId =
      typeof providerConfig.docs[0].brand === 'object'
        ? providerConfig.docs[0].brand.id
        : providerConfig.docs[0].brand;
  }
}
