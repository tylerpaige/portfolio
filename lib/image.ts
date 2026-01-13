import { client } from "../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImage } from "./types";

const builder = imageUrlBuilder(client);

export function imageUrlFor(source: SanityImage) {
  return builder.image(source);
}
