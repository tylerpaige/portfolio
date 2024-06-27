import { Grid, Header, Stack } from "./components";
import { fetchPosts } from "./utilities";

export default async function Home() {
  const { posts: featuredPosts } = await fetchPosts({ featured: true });
  const firstPageResponse = await fetchPosts({ page: 1, featured: false });
  return (
    <div>
      <Header
        className="stripe-a-green stripe-b-gold border-r-cardboard bg-green text-gold"
        innerProps={{ className: "bg-green" }}
      />
      <main>
        <section>
          <Stack title="Featured" posts={featuredPosts} />
        </section>
        {Boolean(firstPageResponse.posts.length) && (
          <section>
            <Grid title="Latest" {...firstPageResponse} basePath="/minus" />
          </section>
        )}
      </main>
    </div>
  );
}
