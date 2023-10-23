import { defineType } from "sanity";

export default defineType({
  title: "Image",
  name: "portfolioImage",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "alt",
      title: "Alt text",
      type: "string",
    },
    {
      name: "size",
      title: "Size",
      type: "string",
      list: ["sm", "md", "lg", "xl"],
      initialValue: "md",
    },
    {
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
    },
  ],
});
