import clsx from "clsx";
import { ReactNode } from "react";
import { missingClass } from "../lib";
import { PageTitle } from "./PageTitle";

interface ErrorProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function Error({ title, children, className, ...props }: ErrorProps) {
  return (
    <div
      className={clsx(
        className,
        missingClass(className, "px-") && "px-2",
        missingClass(className, "mt-") && "mt-2"
      )}
      {...props}
    >
      {title && <PageTitle className="text-5" title={title} />}
      {children}
    </div>
  );
}

interface NotFoundErrorProps {
  [key: string]: unknown;
}

export function NotFoundError(props: NotFoundErrorProps) {
  return (
    <Error title="404" {...props}>
      <p>There's nothing written here.</p>
      <p>You write instead: self@tylerpaige.com</p>
    </Error>
  );
}
