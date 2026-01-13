import { defineType } from "sanity";

export default defineType({
  title: "Video",
  name: "video",
  type: "object",
  fields: [
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
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
  ],
})
