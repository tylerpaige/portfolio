import clsx from "clsx";
import { missingClass } from "../utilities";
import { PageTitle } from "./PageTitle";

export function Error({ title, children, className, ...props }) {
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

export function NotFoundError(props) {
  return (
    <Error title="404" {...props}>
      <p>There's nothing written here.</p>
      <p>You write instead: self@tylerpaige.com</p>
    </Error>
  );
}
