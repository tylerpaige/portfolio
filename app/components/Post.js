import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { imageUrlFor } from "../utilities/image";
import { PortableText } from "@portabletext/react";
import { getEmbedFromVimeoUrl, getIdFromVimeoUrl } from "../utilities";

export function Post({ post, className, bodyProps = {}, ...args }) {
  const { title, hideTitle, url, slug, media, body, tags, collaborators } =
    post;
  const postUrl = `/${slug?.current}/`;

  return (
    <div className={clsx("text-0", className)} {...args}>
      <div className="mb-1/2">
        {Boolean(media.length) && (
          <Media media={media} url={url} postUrl={postUrl} />
        )}
      </div>
      <div {...bodyProps}>
        <TitleAndDescription
          title={title}
          hideTitle={hideTitle}
          url={url}
          postUrl={postUrl}
          body={body}
        />
        {Boolean(Array.isArray(tags) && tags.length) && <TagList tags={tags} />}
        {Boolean(Array.isArray(collaborators) && collaborators.length) && (
          <Collaborators collaborators={collaborators} />
        )}
      </div>
    </div>
  );
}

function Media({ media, url, postUrl }) {
  return (
    <div className={clsx("flex", "flex-wrap", "gap-1/4")}>
      {media.map(({ _type, _key, size, ...media }) => {
        switch (_type) {
          case "portfolioImage":
            const imageElement = (
              <PortfolioImage
                src={media.image?.asset?.url}
                width={media.image?.asset?.metadata?.dimensions?.width}
                height={media.image?.asset?.metadata?.dimensions?.height}
                alt={media.alt}
                size={size}
                key={_key}
              />
            );
            if (media.clickBehavior === "lightbox") {
              return (
                <Link href={media.image?.asset?.url} key={_key}>
                  {imageElement}
                </Link>
              );
            } else if (media.clickBehavior === "customUrl" && media.url) {
              return (
                <Link href={media.url} key={_key}>
                  {imageElement}
                </Link>
              );
            } else if (media.clickBehavior === "postUrl") {
              return (
                <Link href={url || postUrl} key={_key}>
                  {imageElement}
                </Link>
              );
            } else {
              return imageElement;
            }
          case "video":
            return <Video {...media} key={_key} size={size} />;
          case "embed":
            return <Embed {...media} key={_key} size={size} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

const sizeClassNames = {
  default: "max-w-md",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

function Embed({ code, aspectRatio, size = "default", className, ...props }) {
  if (!code) {
    return <></>;
  }

  return (
    <div
      style={{ aspectRatio }}
      dangerouslySetInnerHTML={{ __html: code }}
      className={clsx(
        className,
        "w-full",
        "[&_iframe]:w-full",
        "[&_iframe]:h-full",
        sizeClassNames[size]
      )}
      {...props}
    ></div>
  );
}

function Video({
  url,
  aspectRatio = "16/9",
  size = "default",
  className,
  ...props
}) {
  const embedUrl = getEmbedFromVimeoUrl(url);

  if (!embedUrl) {
    return <></>;
  }

  return (
    <iframe
      style={{ aspectRatio }}
      src={embedUrl}
      className={clsx(className, "w-full", "h-full", sizeClassNames[size])}
      width="100%"
      height="100%"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
      {...props}
    ></iframe>
  );
}

function PortfolioImage({
  src,
  width,
  height,
  alt,
  size = "default",
  ...props
}) {
  if (!src) {
    return <></>;
  }

  return (
    <div {...props}>
      <Image
        src={src}
        width={width}
        height={height}
        className={clsx("w-full", sizeClassNames[size])}
        alt={alt}
      />
    </div>
  );
}

function TitleAndDescription({ title, hideTitle, url, postUrl, body }) {
  if (title && !hideTitle && body) {
    return (
      <>
        <Title title={title} url={url} postUrl={postUrl} />
        <Description body={body} />
      </>
    );
  } else if ((!title || hideTitle) && body) {
    return (
      <>
        <Permalink postUrl={postUrl} />
        <Description body={body} />
      </>
    );
  } else if (title && !hideTitle && !body) {
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
          <Permalink postUrl={postUrl} />{" "}
          <Link href={url} className="underline underline-offset-4 text-pea-green">
            {title}
            {" ↗"}
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
        "max-w-[50ch]",
        className
      )}
    >
      <PortableText
        value={body}
        components={{
          types: {
            portfolioImage: (block) => {
              const url = block.value.image.asset.url;
              const { width, height } =
                block.value.image.asset.metadata.dimensions;
              return (
                <PortfolioImage
                  src={url}
                  width={width}
                  height={height}
                  size="sm"
                  className="block-content"
                />
              );
            },
            video: (block) => {
              const { url } = block.value;
              const aspectRatio = block.value.aspectRatio || "16/9";
              return (
                <Video
                  url={url}
                  aspectRatio={aspectRatio}
                  size="sm"
                  className="block-content"
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
      <ul className="list-none flex flex-wrap gap-em/2">
        {tags.map((tag, index) => (
          <li key={index} className={clsx()}>
            <Link
              href={`/tagged/${tag}/`}
              className="underline underline-offset-4 text-pea-green"
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
                className="underline underline-offset-4 text-pea-green"
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
