import clsx from "clsx";
import { PageTitle } from "./PageTitle";
import { Pagination } from "./Pagination";
import { Post } from "./Post";

export function Stack({
  title,
  posts = [],
  currentPage = 1,
  totalPages = 1,
  basePath,
}) {
  return (
    <div>
      <PageTitle title={title} className="px-2" />
      <div className={clsx('flex', 'flex-col', 'gap-2')}>
        {posts.map((post) => (
          <Post post={post} key={post._id} className="px-1/2" bodyProps={{ className: "px-3/2"}} />
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
