import { getBrandBySlug } from '@/lib/db/gertBrandBySlug';
import { notFound } from 'next/navigation';

export default async function ComplianceLayout({
  params,
  children,
}: {
  params: Promise<{ brandSlug: string }>;
  children: React.ReactNode;
}) {
  const awaitedParams = await params;
  const { brandSlug } = awaitedParams;
  const brandProfile = await getBrandBySlug(brandSlug);

  // @TODO: HANDLE BRAND NOT FOUND
  if (!brandProfile) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-full max-w-4xl mx-auto space-y-4 px-3 py-6">{children}</main>
      <footer className="w-full text-center py-6 border-t border-gray-100 bg-white">
        <p className="text-sm text-gray-600">
          Copyright - &copy;{new Date().getFullYear()} {brandProfile.legalBusinessName}. All rights
          reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Compliance Managed by{' '}
          <a
            href="https://www.homerowdigital.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-900 underline hover:no-underline"
          >
            Home Row Digital
          </a>
        </p>
      </footer>
    </div>
  );
}
