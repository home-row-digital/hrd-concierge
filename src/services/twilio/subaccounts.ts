import { getTwilioClient } from './client';

/**
 * Creates a dedicated SebAccount for a new brand.
 */
export async function createBrandSubaccount(friendlyName: string) {
  const client = getTwilioClient();
  return await client.api.v2010.accounts.create({ friendlyName });
}

/**
 * Searches and buys a local number
 */
export async function purchaseTwilioNumber(subAccountSid: string, areaCode: number = 520) {
  const client = getTwilioClient(subAccountSid);

  // 1. Find available local number
  const available = await client.availablePhoneNumbers('US').local.list({
    areaCode,
    limit: 1,
  });

  if (!available.length) {
    throw new Error(`No available numbers found for areas code: ${areaCode}`);
  }

  // 2. Purchase the first number found
  return await client.incomingPhoneNumbers.create({
    phoneNumber: available[0].phoneNumber,
  });
}
