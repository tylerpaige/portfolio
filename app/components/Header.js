import Link from "next/link";
import clsx from "clsx";
import { missingClass } from "../utilities";

export function Header({ className, innerProps = {} }) {
  const { className: innerClassName, ...restInnerProps } = innerProps;
  return (
    <header
      className={clsx(
        "text-black",
        "border-l-2",
        "border-l-solid",
        "border-l-black",
        "border-r-2",
        "broder-r-solid",
        missingClass(className, "border-r") && "border-r-dark-green",
        missingClass(className, "bg-") && "bg-white-green",
        missingClass(className, "stripe-a") && "stripe-a-gold",
        missingClass(className, "stripe-b") && "stripe-b-dark-green",
        className
      )}
    >
      <div className={clsx("inline-block")}>
        <div
          className={clsx(
            missingClass(innerClassName, "bg-") && "bg-lavender",
            "pt-1/2",
            "pb-3/2",
            "px-1",
            innerClassName
          )}
          {...restInnerProps}
        >
          <h1 className={clsx("text-4", "mb-3em/8", "md:text-12")}>
            <Link
              href="/"
              className={clsx("text-inherit", "-rotate-1", "block")}
            >
              <span className="font-bold">Tyler Paige</span>
              <span
                className={clsx(
                  "inline-block",
                  "ml-3em/8",
                  "animate-flip",
                  "font-sans",
                  "text-[0.875em]"
                )}
              >
                ¶
              </span>
            </Link>
          </h1>
          <h2 className={clsx("text-6", "mb-em", "max-w-[35ch]")}>
            Hello, I am an artist, designer, and coder. I am thinking about
            visual & interactive narratives —
            <br />
            <span className="text-3">stories that tumble over the fingers</span>
          </h2>
          <div
            className={clsx(
              "-text-1",
              "flex",
              "flex-col",
              "gap-2",
              "md:flex-row",
              "md:justify-start"
            )}
          >
            <ul className="list-disc list-inside">
              <li>self at tylerpaige.com</li>
              <li>
                <a href="https://github.com/tylerpaige">github @tylerpaige</a>
              </li>
              <li>
                <a href="https://dizziness.andbalance.center/">
                  teaching portal
                </a>
              </li>
              <li>
                <a href="https://pinboard.in/u:tylerpaige/">
                  pinboard/u:tylerpaige
                </a>
              </li>
            </ul>
            <ul className="list-disc list-inside">
              <li className="list-none">______ work</li>
              <li>
                <a href="/tagged/web">web</a>
              </li>
              <li>
                <a href="/tagged/video">video</a>
              </li>
              <li>
                <a href="/tagged/drawings">drawing</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={clsx("h-2", "stripes")}></div>
    </header>
  );
}
