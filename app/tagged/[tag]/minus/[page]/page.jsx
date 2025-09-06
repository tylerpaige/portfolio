import { notFound, redirect } from 'next/navigation'
import { Grid, Header } from "../../../../components";
import { fetchPosts } from "../../../../utilities";

export default async function PaginatedTagPage({ params }) {
  if (!params.tag) {
    return notFound();
  }

  if (typeof params.page === 'undefined') {
    return redirect(`/tagged/${params.tag}`);
  }
  
  const { tag } = params;
  const page = Number(params.page) + 1;
  const response = await fetchPosts({ tag, page });

  if (response.error) {
    return notFound();
  }

  return (
    <div>
      <Header className="stripe-a-pink stripe-b-gold border-r-gold bg-pink text-dark-magenta" />
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
