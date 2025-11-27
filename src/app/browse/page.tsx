import { BrowseClient } from './BrowseClient';

interface BrowsePageProps {
  searchParams: Promise<{
    package?: string;
    category?: string;
    form?: string;
  }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;

  return (
    <BrowseClient
      highlightPackage={params.package}
      highlightCategory={params.category}
      highlightForm={params.form}
    />
  );
}
