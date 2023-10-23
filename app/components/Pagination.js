import React from "react";
import clsx from "clsx";
import Link from "next/link";

export function usePagination({
  currentPage,
  totalPages,
  basePath,
  windowSize = 5,
}) {
  // Useful creating `/minus/1` meaning the second page of results
  const pathFunc = ({ basePath, page }) => {
    if (page === 1) {
      return basePath;
    } else {
      return `${basePath}/${page - 1}`;
    }
  };

  let paginationWindow = [];
  if (totalPages <= windowSize) {
    paginationWindow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    let minPage = Math.floor(currentPage - (windowSize / 2 - 1));
    let maxPage = Math.ceil(currentPage + (windowSize / 2 - 1));
    minPage = Math.max(minPage, 1);
    maxPage = Math.min(maxPage, totalPages);

    if (maxPage - minPage < windowSize - 1) {
      if (currentPage < totalPages / 2) {
        maxPage = Math.min(
          maxPage + (windowSize - 1) - (maxPage - minPage),
          totalPages
        );
      } else {
        minPage = Math.max(minPage - (windowSize - 1) + (maxPage - minPage), 1);
      }
    }

    paginationWindow = Array.from(
      { length: maxPage - minPage + 1 },
      (_, i) => i + minPage
    );
  }

  const truncatedAtFront = Math.min.call(null, ...paginationWindow) > 1;
  const truncatedAtEnd =
    Math.max.call(null, ...paginationWindow) < totalPages - 1;
  const previousPage = currentPage > 1 ? currentPage - 1 : undefined;
  let previousPagePath;
  const nextPage = currentPage < totalPages ? currentPage + 1 : undefined;
  let nextPagePath;
  const firstPage = 1;
  let firstPagePath;
  const lastPage = totalPages;
  let lastPagePath;
  const pagesInWindow = paginationWindow.map((page) => ({
    page,
    path: pathFunc({ basePath, page }),
  }));

  if (currentPage > 1) {
    previousPagePath = pathFunc({ basePath, page: currentPage - 1 });
  }
  if (currentPage < totalPages) {
    nextPagePath = pathFunc({ basePath, page: currentPage + 1 });
  }
  firstPagePath = firstPagePath = pathFunc({ basePath, page: 1 });
  lastPagePath = pathFunc({ basePath, page: totalPages });

  return {
    currentPage,
    firstPage,
    firstPagePath,
    lastPage,
    lastPagePath,
    nextPage,
    nextPagePath,
    pagesInWindow,
    paginationWindow,
    pathFunc,
    previousPage,
    previousPagePath,
    truncatedAtFront,
    truncatedAtEnd,
  };
}

export function PaginationArrow({ direction, path, className }) {
  const label = direction == "previous" ? "↜ Newer" : "Older ↝";

  return path ? (
    <Link className={className} href={path}>
      {label}
    </Link>
  ) : (
    <span className={className}>{label}</span>
  );
}

export function PaginationItem({ page, path, currentPage }) {
  const isActive = page === currentPage;
  let item;
  if (isActive) {
    item = <span className={clsx("text-lime")}>{page}</span>;
  } else if (path) {
    item = (
      <Link href={path} className="">
        {page}
      </Link>
    );
  } else {
    item = <span className="">{page}</span>;
  }

  return <li>{item}</li>;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  windowSize,
  alwaysShowFirstAndLastPages = true,
  className,
  ...props
}) {
  const {
    pagesInWindow,
    previousPage,
    previousPagePath,
    nextPage,
    nextPagePath,
  } = usePagination({ currentPage, totalPages, basePath, windowSize });

  return (
    <nav
      className={clsx("text-5", "flex", "justify-center", className)}
      {...props}
    >
      <div className="inline-flex min-w-[7em] flex-col gap-0.5 -rotate-2">
        <PaginationArrow
          direction="previous"
          page={previousPage}
          path={previousPagePath}
          className="text-left"
        />
        <ul className="flex flex-col gap-0.5 items-center">
          {pagesInWindow.map(({ page, path }) => (
            <PaginationItem
              key={page}
              page={page}
              path={path}
              currentPage={currentPage}
            />
          ))}
        </ul>
        <PaginationArrow
          direction="next"
          page={nextPage}
          path={nextPagePath}
          className="text-right"
        />
      </div>
    </nav>
  );
}
