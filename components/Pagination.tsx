import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface UsePaginationParams {
  currentPage: number;
  totalPages: number;
  basePath: string;
  windowSize?: number;
}

interface PaginationResult {
  currentPage: number;
  firstPage: number;
  firstPagePath: string;
  lastPage: number;
  lastPagePath: string;
  nextPage?: number;
  nextPagePath?: string;
  pagesInWindow: Array<{ page: number; path: string }>;
  paginationWindow: number[];
  pathFunc: (params: { basePath: string; page: number }) => string;
  previousPage?: number;
  previousPagePath?: string;
  truncatedAtFront: boolean;
  truncatedAtEnd: boolean;
}

export function usePagination({
  currentPage,
  totalPages,
  basePath,
  windowSize = 5,
}: UsePaginationParams): PaginationResult {
  // This a function that takes a page number and returns a path.
  // Useful creating `/minus/1` meaning the second page of results
  // NOTE: this is pretty specific to this portfolio site. You would probably want to adjust it if you're using this code on a different site.
  const pathFunc = ({ basePath, page }: { basePath: string; page: number }) => {
    if (page === 1) {
      return "/";
    } else {
      return `${basePath}/${page - 1}`;
    }
  };

  let paginationWindow: number[] = [];
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

  const truncatedAtFront = Math.min(...paginationWindow) > 1;
  const truncatedAtEnd =
    Math.max(...paginationWindow) < totalPages - 1;
  const previousPage = currentPage > 1 ? currentPage - 1 : undefined;
  let previousPagePath: string | undefined;
  const nextPage = currentPage < totalPages ? currentPage + 1 : undefined;
  let nextPagePath: string | undefined;
  const firstPage = 1;
  let firstPagePath: string;
  const lastPage = totalPages;
  let lastPagePath: string;
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
  firstPagePath = pathFunc({ basePath, page: 1 });
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

interface PaginationArrowProps {
  direction: "previous" | "next";
  path?: string;
  className?: string;
  page?: number;
}

export function PaginationArrow({ direction, path, className }: PaginationArrowProps) {
  const label = direction == "previous" ? "↜ Newer" : "Older ↝";

  return path ? (
    <Link className={className} href={path}>
      {label}
    </Link>
  ) : (
    <span className={className}>{label}</span>
  );
}

interface PaginationItemProps {
  page: number;
  path?: string;
  currentPage: number;
}

export function PaginationItem({ page, path, currentPage }: PaginationItemProps) {
  const isActive = page === currentPage;
  let item: React.ReactNode;
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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  windowSize?: number;
  alwaysShowFirstAndLastPages?: boolean;
  className?: string;
  [key: string]: unknown;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  windowSize,
  alwaysShowFirstAndLastPages = true,
  className,
  ...props
}: PaginationProps) {
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
        {previousPage && (
          <PaginationArrow
            direction="previous"
            page={previousPage}
            path={previousPagePath}
            className="text-left"
          />
        )}
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
        {nextPagePath && (
          <PaginationArrow
            direction="next"
            page={nextPage}
            path={nextPagePath}
            className="text-right"
          />
        )}
      </div>
    </nav>
  );
}
