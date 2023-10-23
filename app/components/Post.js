import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { imageUrlFor } from "../utilities/image";
import { PortableText } from "@portabletext/react";

export function Post({ post, className, bodyProps = {}, ...args }) {
  const { title, url, slug, media, body, tags, collaborators } = post;
  const postUrl = `/${slug.current}/`;

  return (
    <div className={clsx("text-0", className)} {...args}>
      <div className="mb-1/2">
        {Boolean(media.length) && <Media media={media} />}
      </div>
      <div {...bodyProps}>
        <TitleAndDescription
          title={title}
          url={url}
          postUrl={postUrl}
          body={body}
        />
        {Boolean(tags.length) && <TagList tags={tags} />}
        {Boolean(collaborators.length) && (
          <Collaborators collaborators={collaborators} />
        )}
      </div>
    </div>
  );
}

function Media({ media }) {
  return (
    <div className={clsx("flex", "flex-wrap")}>
      {media.map(({ _type, _key, ...media }) => {
        switch (_type) {
          case "image":
            return (
              <PortfolioImage
                src={media.asset.url}
                width={media.asset.metadata.dimensions.width}
                height={media.asset.metadata.dimensions.height}
                size={media.size}
                key={_key}
              />
            );
          case "video":
            return <Video {...media} key={_key} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function Video({ url, aspectRatio = "16/9" }) {
  return (
    <iframe
      style={{ aspectRatio }}
      src={url}
      width="100%"
      height="100%"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
    ></iframe>
  );
}

function PortfolioImage({ src, width, height, size = "default" }) {
  const sizeClassNames = {
    default: "max-w-md",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };
  return (
    <div>
      <Image
        src={src}
        width={width}
        height={height}
        className={clsx("w-full", sizeClassNames[size])}
      />
    </div>
  );
}

function TitleAndDescription({ title, url, postUrl, body }) {
  if (title && body) {
    return (
      <>
        <Title title={title} url={url} postUrl={postUrl} />
        <Description body={body} />
      </>
    );
  } else if (!title && body) {
    return (
      <>
        <Permalink postUrl={postUrl} className={"float-left"} />
        <Description body={body} />
      </>
    );
  } else if (title && !body) {
    return <Title title={title} url={url} postUrl={postUrl} />;
  } else {
    return <Permalink postUrl={postUrl} />;
  }
}

function Title({ title, url, postUrl, className }) {
  return (
    <div className={clsx(className)}>
      {url ? (
        <>
          <Permalink postUrl={postUrl} />
          <Link href={url} className="underline underline-offset-4">
            {title}
          </Link>
        </>
      ) : (
        <Link href={postUrl} className="underline underline-offset-4">
          {title}
        </Link>
      )}
    </div>
  );
}

function Description({ body, className }) {
  return (
    <div
      className={clsx(
        "markdown",
        "text-5",
        "mt-em/4",
        "first:mt-0",
        "mb-em/2",
        "last:mb-0",
        className
      )}
    >
      <PortableText
        value={body}
        components={{
          types: {
            image: (block) => {
              const { asset } = block.value;
              const { url } = asset;
              const { width, height } = asset.metadata.dimensions;
              return (
                <PortfolioImage
                  src={url}
                  width={width}
                  height={height}
                  size="sm"
                />
              );
            },
          },
        }}
      />
    </div>
  );
}

function Permalink({ postUrl, className }) {
  return (
    <Link href={postUrl} className={clsx(className)}>
      ¶
    </Link>
  );
}

function TagList({ tags }) {
  return (
    <div className="flex gap-em/2">
      <p className="">Tagged as:</p>
      <ul className="list-none flex flex-wrap">
        {tags.map((tag, index) => (
          <li key={index} className={clsx()}>
            <Link
              href={`/tagged/${tag}/`}
              className="underline underline-offset-4 text-lime"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Collaborators({ collaborators }) {
  return (
    <div className="flex gap-em/2">
      <p className="">With</p>
      <ul className="list-none flex flex-wrap">
        {collaborators.map((collaborator, index) => (
          <li key={index} className={clsx()}>
            {collaborator.url ? (
              <Link
                href={collaborator.url}
                className="underline underline-offset-4 text-lime"
              >
                {collaborator.name}
              </Link>
            ) : (
              <span>{collaborator.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
