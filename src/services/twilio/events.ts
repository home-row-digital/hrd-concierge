import { getTwilioClient } from './client';

/**
 * SUBSCRIBER: We will run this ONE TIME to create the Sink
 * and tell Twilio where to send events
 */
export async function createUniversalSync(webhookUrl: string) {
  const client = getTwilioClient();
  return await client.events.v1.sinks.create({
    description: 'Universal ISV Event Firehose',
    sinkConfiguration: {
      destination: webhookUrl,
      method: 'POST',
      batch_events: false, // IF WE SEE MASSIVE VOLUME, SWITCH TO TRUE
    },
    sinkType: 'webhook',
  });
}

/**
 * Subscribe to Everything
 */
export async function subscribeToAllEvents(sinkSid: string) {
  const client = getTwilioClient();

  const eventTypes = [
    // --- A2P 10DLC & TRUSTHUB (The Compliance Flow) ---
    { type: 'com.twilio.trusthub.customer_profile.approved' },
    { type: 'com.twilio.trusthub.customer_profile.rejected' },
    { type: 'com.twilio.messaging.brand_registration.approved' },
    { type: 'com.twilio.messaging.brand_registration.failed' },
    { type: 'com.twilio.messaging.campaign.approved' },
    { type: 'com.twilio.messaging.campaign.rejected' },

    // --- MESSAGING & RELAY (The Live Traffic) ---
    { type: 'com.twilio.messaging.message.delivered' },
    { type: 'com.twilio.messaging.message.failed' },
    { type: 'com.twilio.messaging.message.undelivered' }, // Relay issues often show up here

    // --- VOICE ---
    { type: 'com.twilio.voice.call.completed' },
  ];

  return await client.events.v1.subscriptions.create({
    description: 'Master Subscription',
    sinkSid,
    types: eventTypes,
  });
}
