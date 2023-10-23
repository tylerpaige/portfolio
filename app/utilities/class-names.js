// This helper allows you to check if a string contains a class or a class prefix.
// It's useful for components that have a default style that can be overridden in
// the component's instantiation, via the `className` prop.
//
// For example, a Button component might be styled with `w-5` by default, but if
// a developer wants to override that, they can pass `className="w-10"`.
//
// Button component:
// function Button(props) {
//   return (
//     <button className={clsx(missingClass(props.className, 'w-') && 'w-5', props.className)} />
//   );
// }
//
// Button instantiation:
// <Button className="w-10" />
export function missingClass(string, prefix) {
  // If the string is empty, then it's missing the class because it's missing everything
  if (!string) {
    return true;
  }

  if (Array.isArray(prefix)) {
    return prefix.every((p) => missingClass(string, p));
  } else if (typeof prefix === "string") {
    const regex = new RegExp(` ?${prefix}`, "g");
    return string.match(regex) === null;
  }

  return false;
}

export function missingDisplayClass(string) {
  return missingClass(string, [
    "inline",
    "inline-block",
    "block",
    "flex",
    "inline-flex",
    "grid",
    "hidden",
  ]);
}

export function missingPositionClass(string) {
  return missingClass(string, [
    "static",
    "fixed",
    "absolute",
    "relative",
    "sticky",
  ]);
}

export function missingSvgColorClass(string) {
  return missingClass(string, ["fill-", "stroke-"]);
}
