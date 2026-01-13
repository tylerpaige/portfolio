import clsx from "clsx";
import { PageTitle } from "./PageTitle";
import { Pagination } from "./Pagination";
import { Post } from "./Post";
import { Post as PostType } from "../types";

interface StackProps {
  title: string;
  posts?: PostType[];
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
}

export function Stack({
  title,
  posts = [],
  currentPage = 1,
  totalPages = 1,
  basePath,
}: StackProps) {
  return (
    <div>
      <PageTitle title={title} className="px-2" />
      <div className={clsx("flex", "flex-col", "gap-2")}>
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            className="px-1/2"
            bodyProps={{ className: "px-3/2" }}
            fontSize="large"
          />
        ))}
      </div>
      {totalPages > 1 && basePath && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
        />
      )}
    </div>
  );
}
