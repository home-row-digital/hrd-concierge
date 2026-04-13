import twilio from 'twilio';

const masterSid = process.env.TWILIO_ACCOUNT_SID;
const masterToken = process.env.TWILIO_AUTH_TOKEN;

/**
 * Multi-tenant Twilio client
 */
export const getTwilioClient = (subAccountSid?: string) => {
  if (!masterSid || !masterToken) throw new Error('Missing Master Twilio Credentials');
  return twilio(masterSid, masterToken, subAccountSid ? { accountSid: subAccountSid } : {});
};
