// sanity.js
import { client } from "../../sanity/lib/client";

const PER = 6;

const postProjectection = `{
  _id,
  title,
  hideTitle,
  url,
  body,
  slug,
  featured,
  publishedAt,
  media[]{
    ...,
    image{
      asset->{
        url,
        metadata{
          dimensions{
            width,
            height,
            aspectRatio
          }
        },
        "_key": _id
      }
    }
  },
  body[]{
    ...,
    image{
      asset->{
        url,
        metadata{
          dimensions{
            width,
            height,
            aspectRatio
          }
        },
        "_key": _id
      }
    }
  },
  "tags": tags[]->title,
  collaborators[]->{name, url}
}`;

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function fetchPosts({ page, tag, featured } = {}) {
  const filters = [];
  filters.push(`_type == "post"`);

  if (featured === true) {
    filters.push(`featured == ${featured}`);
  } else if (featured === false) {
    filters.push(`(featured == false || featured == null)`);
  }

  if (tag) {
    filters.push(`"${tag}" in tags[]->title`);
  }
  const filterStatement = `*[${filters.join(" && ")}]`;

  const orders = [];
  orders.push(`| order(publishedAt desc)`);
  const orderStatement = orders.join(" ");

  // NOTE: this is slow pagination, but since the blog will be small, it's fine.
  // Do not replicate this code for larger datasets. Instead, refer to this
  // documentation for help: https://www.sanity.io/docs/paginating-with-groq
  const selectorStatement =
    typeof page === "number" ? `[${(page - 1) * PER}...${page * PER}]` : "";

  const query = [
    filterStatement,
    orderStatement,
    selectorStatement,
    postProjectection,
  ].join(" ");

  const posts = await client.fetch(query);

  if (!Boolean(posts.length)) {
    return {
      posts: [],
      totalPages: 0,
      currentPage: 0,
      error: {
        status: "404",
        type: "Not Found",
        message: "No posts found.",
      },
    };
  }

  const totalPages = await client
    .fetch(`count(${filterStatement})`)
    .then((count) => Math.max(Math.ceil(count / PER), 1));

  return {
    posts,
    totalPages,
    currentPage: page,
  };
}

export async function fetchPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]${postProjectection}`;
  const post = await client.fetch(query, { slug });
  return post;
}
