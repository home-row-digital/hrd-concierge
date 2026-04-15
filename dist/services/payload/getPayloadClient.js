import { getPayload } from 'payload';
let cachedPayload = global.payload;
if (!cachedPayload) {
    cachedPayload = global.payload = { client: null, promise: null };
}
export async function getPayloadClient() {
    if (cachedPayload.client)
        return cachedPayload.client;
    if (!cachedPayload.promise) {
        cachedPayload.promise = (async () => {
            const configModule = await import('../../payload.config');
            const config = await configModule.default;
            return getPayload({ config });
        })();
    }
    try {
        cachedPayload.client = await cachedPayload.promise;
    }
    catch (err) {
        cachedPayload.promise = null;
        throw err;
    }
    return cachedPayload.client;
}
