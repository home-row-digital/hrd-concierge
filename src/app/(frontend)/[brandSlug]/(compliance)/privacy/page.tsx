import { getBrandBySlug } from '@/lib/db/gertBrandBySlug';
import { formatPhoneNumber } from '@/lib/utils/phoneFortmatter';
import { Brand } from '@/payload-types';
import { notFound } from 'next/navigation';

export default async function BrandPrivacyPolicyPage({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const awaitedParams = await params;
  const { brandSlug } = awaitedParams;
  const brandProfile = await getBrandBySlug(brandSlug);

  // @TODO: HANDLE BRAND NOT FOUND
  if (!brandProfile) return notFound();

  const { brand, legalBusinessName, streetAddress, city, state, zip, websiteUrl } = brandProfile;
  const { brandName, registeredPhone, supportEmail } = brand as Brand;

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-semibold">{brandName} Mobile Privacy Policy</h1>
      <p className="text-xl italic">
        This Privacy Policy describes how <strong>{brandName}</strong> collects and uses information
        specifically related to our text messaging program. This program is operated by{' '}
        <strong>{legalBusinessName}</strong>.{' '}
        {websiteUrl ? (
          <span>
            {' '}
            This is a supplemental policy to our{' '}
            <a
              href={`https://${websiteUrl}`}
              className="underline hover:no-underline text-blue-900"
            >
              primary privacy practices
            </a>
            .
          </span>
        ) : (
          <span> This policy governs our data collection and messaging practices.</span>
        )}
      </p>

      <ol className="list-decimal mx-4 space-y-6">
        <li>
          <h3 className="font-semibold text-xl">Information We Collect</h3>
          <p>
            We collect your phone number and any other information you provide through our chat
            assistant or lead capture forms. This data is used solely to communicate with you
            regarding your inquiry or service.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">How We Use Information</h3>
          <p>
            We use your information to send you the text messages you have requested, to provide
            customer support, and to improve our messaging services.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">NO SHARING OF PERSONAL DATA</h3>
          <p className="font-semibold">
            No mobile information will be shared with third parties or affiliates for marketing or
            promotional purposes. All the above categories exclude text messaging originator opt-in
            data and consent; this information will not be shared with any third parties.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Data Security</h3>
          <p>
            We maintain administrative, technical, and physical safeguards designed to protect the
            personal information you provide against accidental, unlawful, or unauthorized
            destruction, loss, alteration, access, disclosure, or use.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Contact Us</h3>
          <p>If you have questions about this Mobile Privacy Policy, please contact us:</p>
          <ul className="list-disc mx-4 space-y-2 py-2">
            <li>
              <strong>Email:</strong>{' '}
              <a
                className="text-blue-900 underline hover:no-underline"
                href={`mailto:${supportEmail}`}
              >
                {supportEmail}
              </a>
            </li>
            <li>
              <strong>Phone:</strong> {formatPhoneNumber(registeredPhone)}
            </li>
            <li>
              <strong>Address:</strong> {streetAddress}, {city}, {state}, {zip}
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ brandSlug: string }> }) {
  const awaitedParams = await params;
  const { brandSlug } = awaitedParams;
  const brandProfile = await getBrandBySlug(brandSlug);

  if (!brandProfile) return null;

  const brand = brandProfile.brand as Brand;

  return {
    title: `${brand.brandName} Mobile Privacy Policy`,
    description: `Mobile privacy policy for ${brandProfile.legalBusinessName}`,
  };
}
