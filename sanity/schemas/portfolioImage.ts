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
      name: "clickBehavior",
      title: "Click through",
      type: "string",
      options: {
        list: [
          { title: "Lightbox", value: "lightbox" },
          { title: "Custom URL", value: "customUrl" },
          { title: "Post URL", value: "postUrl" },
          { title: "None", value: "none" },
        ],
        initialValue: "lightbox",
      },
      initialValue: "lightbox",
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      hidden: ({ parent }: { parent?: { clickBehavior?: string } }) => parent?.clickBehavior !== "customUrl",
    },
    {
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Medium", value: "md" },
          { title: "Large", value: "lg" },
          { title: "Extra-large", value: "xl" },
        ],
        layout: "dropdown",
      },
      initialValue: "md",
    },
    {
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
    },
  ],
});
