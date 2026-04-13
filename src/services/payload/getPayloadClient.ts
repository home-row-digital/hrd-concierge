import { BasePayload, getPayload } from 'payload';
import config from '@payload-config';

interface PayloadCache {
  client: BasePayload | null;
  promise: Promise<BasePayload> | null;
}

let cachedPayload: PayloadCache = (global as any).payload;

if (!cachedPayload) {
  cachedPayload = (global as any).payload = { client: null, promise: null };
}

export async function getPayloadClient(): Promise<BasePayload> {
  if (cachedPayload.client) return cachedPayload.client;

  if (!cachedPayload.promise) {
    cachedPayload.promise = getPayload({ config });
  }

  try {
    cachedPayload.client = await cachedPayload.promise;
  } catch (err) {
    cachedPayload.promise = null;
    throw err;
  }

  return cachedPayload.client;
}
