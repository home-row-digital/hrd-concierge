import { getPayload } from 'payload';
import config from '@payload-config';

let cachedPayload = (global as any).payload;

if (!cachedPayload) {
  cachedPayload = (global as any).payload = { client: null, promise: null };
}

export const getPayloadClient = async () => {
  if (cachedPayload.client) return cachedPayload.client;

  if (!cachedPayload.promise) {
    cachedPayload.promise = getPayload({ config });
  }

  try {
    cachedPayload.client = await cachedPayload.promise;
  } catch (err) {
    throw err;
  }

  return cachedPayload.client;
};
