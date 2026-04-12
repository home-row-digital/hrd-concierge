export default async function BrandSlugPage({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const awaitedParams = await params;
  const { brandSlug } = awaitedParams;

  return <>BRAND SLUG PAGE FOR BRAND: {brandSlug}</>;
}
