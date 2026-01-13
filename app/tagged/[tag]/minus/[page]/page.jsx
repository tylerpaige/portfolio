import { notFound, redirect } from 'next/navigation'
import { Grid, Header } from "../../../../components";
import { fetchPosts } from "../../../../utilities";

export default async function PaginatedTagPage({ params }) {
  const resolvedParams = await params;
  if (!resolvedParams.tag) {
    return notFound();
  }

  if (typeof resolvedParams.page === 'undefined') {
    return redirect(`/tagged/${resolvedParams.tag}`);
  }
  
  const { tag } = resolvedParams;
  const page = Number(resolvedParams.page) + 1;
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
