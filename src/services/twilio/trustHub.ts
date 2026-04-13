import { getTwilioClient } from './client';

/**
 * Creates the base Customer Profile Bundle
 */
export async function createCustomerProfileBundle(
  subAccountSid: string,
  email: string,
  policySid: string,
) {
  const client = getTwilioClient(subAccountSid);
  return await client.trusthub.v1.customerProfiles.create({
    friendlyName: 'Business Identity Bundle',
    email,
    policySid, // This SID is found in Twilio Console for "A2P Customer Profile"
  });
}

/**
 * Creates a Business Identity (End User) resource.
 */
export async function createBusinessEndUser(subAccountSid: string, legalName: string) {
  const client = getTwilioClient(subAccountSid);
  return await client.trusthub.v1.endUsers.create({
    friendlyName: legalName,
    type: 'business',
    attributes: {
      business_name: legalName,
    },
  });
}

/**
 * Assigns an End User or Supporting Document to a Bundle.
 */
export async function assignToBundle(subAccountSid: string, bundleSid: string, objectSid: string) {
  const client = getTwilioClient(subAccountSid);
  return await client.trusthub.v1
    .customerProfiles(bundleSid)
    .customerProfilesEntityAssignments.create({ objectSid });
}
