import React from "react";
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export function imageUrlFor(source) {
  return builder.image(source);
}
