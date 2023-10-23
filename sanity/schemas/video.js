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
    }
  ],
})