import { cache } from 'react';
import { getPayloadClient } from '@/services/payload/getPayloadClient';

export const getBrandBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient();

  const brandQuery = await payload.find({
    collection: 'brand-profiles',
    depth: 1,
    where: {
      'brand.slug': {
        equals: slug,
      },
    },
  });

  if (brandQuery.docs.length < 1) return null;

  return brandQuery.docs[0];
});

export const revalidate = 0;
