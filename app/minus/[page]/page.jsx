import { notFound, redirect } from "next/navigation";
import { Grid, Header } from "../../components";
import { fetchPosts } from "../../utilities";

export default async function PaginatedPage({ params }) {
  if (typeof params.page === "undefined") {
    redirect("/");
  }

  const page = Number(params.page) + 1;
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
