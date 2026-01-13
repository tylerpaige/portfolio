import { defineType } from "sanity";

export default defineType({
  title: "Embed",
  name: "embed",
  type: "object",
  fields: [
    {
      name: "code",
      title: "Embed Code",
      type: "text",
    },
    {
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
    }
  ],
})
