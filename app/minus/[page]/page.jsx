import { notFound, redirect } from 'next/navigation'
import { Grid, Header } from "../../components";
import { fetchPosts } from "../../utilities";

export default async function PaginatedPage({ params }) {
  const page = Number(params.page || 1);
  const response = await fetchPosts({ page, featured: false });

  // If page == 1 then redirect to home
  if (page === 1) {
    redirect('/');
  }

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
