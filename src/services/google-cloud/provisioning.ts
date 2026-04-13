import { getPayloadClient } from '../payload/getPayloadClient';

/**
 * We call this service when we onboard a new brand.
 * It prepares the data for the actual GCP Resource Manager calls.
 */
export async function provisionBrand(brandId: string) {
  const payload = await getPayloadClient();

  // Generate uniq Project ID (Google requires 6-30 chars, lowercase, digits, hyphens)
  const brandDoc = await payload.findByID({ collection: 'brands', id: brandId });
  const sanitizedName = brandDoc.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const uniqueProjectId = `kai-v1-${sanitizedName}-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    // @TODO: Use @google-cloud/resource-manager to create the project
    // @TODO: Use @google-cloud/service-usage to enable 'generativeai.googleapis.com'
    // @TODO: Use @google-cloud/apikeys to generate a restricted API key

    // Update the ProviderConfigs collection with the "Plan"
    const config = await payload.find({
      collection: 'provider-configs',
      where: { brandId: { equals: brandId } },
    });

    if (config.docs.length > 0) {
      await payload.update({
        collection: 'provider-configs',
        id: config.docs[0].id,
        data: {
          gcpProjectId: uniqueProjectId,
          gcpProjectStatus: 'PROVISIONING',
        },
      });
    }

    console.log(`[GCP] Infrastructure plan created for: ${uniqueProjectId}`);
    return uniqueProjectId;
  } catch (err) {
    console.error('Provisioning failed:', err);
    throw err;
  }
}
