import { notFound, redirect } from "next/navigation";
import { Grid, Header } from "../../../components";
import { fetchPosts } from "../../../lib";

interface PaginatedPageProps {
  params: Promise<{ page: string }>;
}

export default async function PaginatedPage({ params }: PaginatedPageProps) {
  const resolvedParams = await params;
  if (typeof resolvedParams.page === "undefined") {
    redirect("/");
  }

  const page = Number(resolvedParams.page) + 1;
  const response = await fetchPosts({ page, featured: false });

  if (response.error) {
    notFound();
  }

  return (
    <div>
      <Header className="bg-green border-l-steel-blue border-r-black" />
      <main>
        <Grid title="Archive" {...response} basePath="/minus" />
      </main>
    </div>
  );
}
