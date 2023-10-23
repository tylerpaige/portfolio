import { Grid, Header, Stack } from "./components";
import { fetchPosts } from "./utilities";

export default async function Home() {
  const { posts: featuredPosts } = await fetchPosts({ featured: true });
  const firstPageResponse = await fetchPosts({ page: 1, featured: false });
  return (
    <div>
      <Header
        className="stripe-a-pink stripe-b-gold border-r-gold bg-pink text-black"
        innerProps={{ className: "bg-lavender" }}
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
