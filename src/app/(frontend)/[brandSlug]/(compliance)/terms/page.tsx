import { getBrandBySlug } from '@/lib/db/gertBrandBySlug';
import { formatPhoneNumber } from '@/lib/utils/phoneFortmatter';
import { Brand } from '@/payload-types';
import { notFound } from 'next/navigation';

export default async function BrandTermsPage({
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
      <h1 className="text-3xl md:text-4xl font-semibold">{brandName} SMS Terms of Service</h1>
      <p className="text-xl italic">
        This policy specifically governs the mobile messaging program for {brandName}.{' '}
        {websiteUrl ? (
          <span>
            For our general website terms, please visit{' '}
            <a
              className="text-blue-900 underline hover:no-underline"
              href={`https://${websiteUrl}`}
            >
              {websiteUrl}
            </a>
            .
          </span>
        ) : null}
      </p>

      <ol className="list-decimal mx-4 space-y-6">
        <li>
          <h3 className="font-semibold text-xl">Program Description</h3>
          <p>
            By opting in, you agree to receive recurring automated promotional and personalized
            marketing text messages (e.g., cart reminders or lead follow-ups) from{' '}
            <strong>{brandName}</strong> at the cell number used when signing up. Consent is not a
            condition of any purchase.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Message Frequency</h3>
          <p>
            Message frequency varies based on your interaction with our site and chat assistant.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Cost</h3>
          <p>
            Message and data rates may apply. Check with your mobile carrier for details on your
            plan.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Help & Support</h3>
          <p>
            {/* TODO: SWAP THIS WITH THE BRAND'S TWILIO NUMBER! */}
            Text <strong>HELP</strong> to [BRAND_TWILIO_NUMBER] for assistance, or email us at{' '}
            <a
              className="text-blue-900 font-semibold underline hover:no-underline"
              href={`mailto:${supportEmail}`}
            >
              {supportEmail}
            </a>
            .
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Opt-Out</h3>
          <p>
            If you wish to stop receiving text messages from {brandName}, reply{' '}
            <strong>STOP</strong> to any mobile message sent from us. You will receive one final
            message confirming that you have been unsubscribed.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Carrier Disclaimer</h3>
          <p>Mobile carriers are not liable for delayed or undelivered messages.</p>
        </li>
        <li>
          <h3 className="font-semibold text-xl">Contact Us</h3>
          <p>If you have questions about these SMS Terms of Service, please contact us:</p>
          <ul className="list-disc mx-4 space-y-2">
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
    title: `${brand.brandName} SMS Terms of Service`,
    description: `SMS Terms of Service for ${brandProfile.legalBusinessName}`,
  };
}
