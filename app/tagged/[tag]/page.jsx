import { notFound } from 'next/navigation'
import { Grid, Header } from "../../components";
import { fetchPosts } from "../../utilities";

export default async function TagPage({ params }) {
  const { tag } = params;
  const response = await fetchPosts({ tag });

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
