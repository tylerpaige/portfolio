import { notFound } from 'next/navigation'
import { Grid, Header } from "../../../../components";
import { fetchPosts } from "../../../../utilities";

export default async function PaginatedTagPage({ params }) {
  const { tag } = params;
  const page = Number(params.page || 1);
  const response = await fetchPosts({ tag, page });

  if (response.error) {
    return notFound();
  }

  return (
    <div>
      <Header />
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
