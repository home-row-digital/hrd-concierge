import { getPayloadClient } from '@/services/payload/getPayloadClient';

export default async function BrandPrivacyPolicyPage({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const awaitedParams = await params;
  const { brandSlug } = awaitedParams;

  //   const payload = await getPayload({ config });

  const payload = await getPayloadClient();
  const brandQuery = await payload.find({
    collection: 'brands',
    where: {
      slug: {
        equals: brandSlug,
      },
    },
  });

  const { brandName, slug, registeredPhone, supportEmail } = brandQuery.docs[0];

  console.log(brandQuery);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold">{brandName} Mobile Privacy Policy</h1>
      <p className="text-xl italic">
        This Privacy Policy describes how {brandName} collects and uses information specifically
        related to our text messaging program. This is a supplemental policy to our primary privacy
        practices.
      </p>
    </div>
  );
}
