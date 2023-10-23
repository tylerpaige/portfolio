import clsx from "clsx";

export function PageTitle({ title, className, ...props }) {
  return (
    <h2
      className={clsx(
        "text-6",
        "underline",
        "decoration-2",
        "underline-offset-4",
        "mb-em/2",
        "mt-2em",
        className
      )}
      {...props}
    >
      {title}
    </h2>
  );
}
