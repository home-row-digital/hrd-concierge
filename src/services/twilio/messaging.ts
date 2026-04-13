import { getTwilioClient } from './client';

/**
 * Creates a Messaging Service to house the brand's numbers
 */
export async function createMessagingService(subAccountSid: string, brandName: string) {
  const client = getTwilioClient(subAccountSid);
  return await client.messaging.v1.services.create({
    friendlyName: `${brandName} Service`,
  });
}

/**
 * Adds a phone number to a Messaging Service
 */
export async function addNumberToMessagingService(
  subAccountSid: string,
  serviceSid: string,
  phoneNumberSid: string,
) {
  const client = getTwilioClient(subAccountSid);
  return await client.messaging.v1.services(serviceSid).phoneNumbers.create({ phoneNumberSid });
}
