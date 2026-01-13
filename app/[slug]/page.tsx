import { notFound } from 'next/navigation'
import { Header, Post } from "../../components";
import { fetchPost } from "../../lib";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main>
        <Post
          post={post}
          className="px-1/2 mt-2"
          bodyProps={{ className: "px-3/2" }}
        />
      </main>
    </div>
  );
}
