import { notFound } from 'next/navigation'
import { Grid, Header } from "../../components";
import { fetchPosts } from "../../utilities";

export default async function PaginatedPage({ params }) {
  const page = Number(params.page || 1);
  const response = await fetchPosts({ page });

  if (response.error) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main>
        <Grid title="Archive" {...response} basePath="/minus" />
      </main>
    </div>
  );
}
