import { notFound } from 'next/navigation'
import { Grid, Header } from "../../../components";
import { fetchPosts } from "../../../lib";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  if (!resolvedParams.tag) {
    return notFound();
  }

  const { tag } = resolvedParams;
  const response = await fetchPosts({ tag, page: 1 });

  if (response.error) {
    return notFound();
  }

  return (
    <div>
      <Header className="text-[#045404]" />
      <main>
        <Grid
          title={`Tagged: ${tag}`}
          {...response}
          basePath={`/tagged/${tag}/minus`}
        />
      </main>
    </div>
  );
}
