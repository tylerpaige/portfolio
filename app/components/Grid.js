import clsx from "clsx";
import { PageTitle } from "./PageTitle";
import { Pagination } from "./Pagination";
import { Post } from "./Post";

export function Grid({
  title,
  posts,
  currentPage = 1,
  totalPages = 1,
  basePath,
}) {
  return (
    <div>
      <PageTitle title={title} className="px-2 md:px-1/2" />
      <div
        className={clsx(
          "px-1/2",
          "grid",
          "grid-cols-1",
          "gap-x-1",
          "gap-y-2",
          "mb-2",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "xl:grid-cols-4"
        )}
      >
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            bodyProps={{ className: "px-3/2 md:px-0" }}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
        />
      )}
    </div>
  );
}
