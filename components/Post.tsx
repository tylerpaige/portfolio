import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  imageUrlFor,
  getEmbedFromVimeoUrl,
  getIdFromVimeoUrl,
  Post as TPost,
  MediaItem,
  PortfolioImage,
  Video,
  Embed,
  SanityImage,
} from "../lib";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {
  post: TPost;
  className?: string;
  fontSize?: "small" | "medium" | "large";
  bodyProps?: { className?: string; [key: string]: unknown };
  [key: string]: unknown;
}

export function Post({
  post,
  className,
  fontSize = "medium",
  bodyProps = {},
  ...args
}: PostProps) {
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
          fontSize={fontSize}
        />
        {Boolean(Array.isArray(tags) && tags.length) && <TagList tags={tags} />}
        {Boolean(Array.isArray(collaborators) && collaborators.length) && (
          <Collaborators collaborators={collaborators} />
        )}
      </div>
    </div>
  );
}

interface MediaProps {
  media: MediaItem[];
  url?: string;
  postUrl: string;
}

function Media({ media, url, postUrl }: MediaProps) {
  return (
    <div className={clsx("flex", "flex-wrap", "gap-1/4")}>
      {media.map(({ _type, _key, size, ...mediaItem }) => {
        switch (_type) {
          case "portfolioImage":
            const portfolioImage = mediaItem as PortfolioImage;
            const imageElement = (
              <PortfolioImageComponent
                src={portfolioImage.image?.asset?.url}
                width={portfolioImage.image?.asset?.metadata?.dimensions?.width}
                height={
                  portfolioImage.image?.asset?.metadata?.dimensions?.height
                }
                alt={portfolioImage.alt}
                size={size}
                key={_key}
              />
            );
            if (portfolioImage.clickBehavior === "lightbox") {
              return (
                <Link href={portfolioImage.image?.asset?.url || "#"} key={_key}>
                  {imageElement}
                </Link>
              );
            } else if (
              portfolioImage.clickBehavior === "customUrl" &&
              portfolioImage.url
            ) {
              return (
                <Link href={portfolioImage.url} key={_key}>
                  {imageElement}
                </Link>
              );
            } else if (portfolioImage.clickBehavior === "postUrl") {
              return (
                <Link href={url || postUrl} key={_key}>
                  {imageElement}
                </Link>
              );
            } else {
              return imageElement;
            }
          case "video":
            return (
              <VideoComponent
                {...(mediaItem as Video)}
                key={_key}
                size={size}
              />
            );
          case "embed":
            return (
              <EmbedComponent
                {...(mediaItem as Embed)}
                key={_key}
                size={size}
              />
            );
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

interface EmbedProps {
  code: string;
  aspectRatio?: string;
  size?: keyof typeof sizeClassNames;
  className?: string;
  [key: string]: unknown;
}

function EmbedComponent({
  code,
  aspectRatio,
  size = "default",
  className,
  ...props
}: EmbedProps) {
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

interface VideoProps {
  url: string;
  aspectRatio?: string;
  size?: keyof typeof sizeClassNames;
  className?: string;
  [key: string]: unknown;
}

function VideoComponent({
  url,
  aspectRatio = "16/9",
  size = "default",
  className,
  ...props
}: VideoProps) {
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
      frameBorder="0"
      allowFullScreen
      {...props}
    ></iframe>
  );
}

interface PortfolioImageProps {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  size?: keyof typeof sizeClassNames;
  [key: string]: unknown;
}

function PortfolioImageComponent({
  src,
  width,
  height,
  alt,
  size = "default",
  ...props
}: PortfolioImageProps) {
  if (!src) {
    return <></>;
  }

  return (
    <div {...props}>
      <Image
        src={src}
        width={width || 800}
        height={height || 600}
        className={clsx("w-full", sizeClassNames[size])}
        alt={alt || ""}
      />
    </div>
  );
}

interface TitleAndDescriptionProps {
  title?: string;
  hideTitle?: boolean;
  url?: string;
  postUrl: string;
  body: TPost["body"];
  fontSize?: "small" | "medium" | "large";
}

function TitleAndDescription({
  title,
  hideTitle,
  url,
  postUrl,
  body,
  fontSize = "medium",
}: TitleAndDescriptionProps) {
  if (title && !hideTitle && body) {
    return (
      <>
        <Title title={title} url={url} postUrl={postUrl} className="mb-em" />
        <Description body={body} fontSize={fontSize} className="mb-em" />
      </>
    );
  } else if ((!title || hideTitle) && body) {
    return (
      <>
        <Permalink postUrl={postUrl} className="mb-em/2 last:mb-0" />
        <Description
          body={body}
          fontSize={fontSize}
          className="mb-em last:mb-0"
        />
      </>
    );
  } else if (title && !hideTitle && !body) {
    return (
      <Title
        title={title}
        url={url}
        postUrl={postUrl}
        className="mb-em/2 last:mb-0"
      />
    );
  } else {
    return <Permalink postUrl={postUrl} className="mb-em/2 last:mb-0" />;
  }
}

interface TitleProps {
  title: string;
  url?: string;
  postUrl: string;
  className?: string;
}

function Title({ title, url, postUrl, className }: TitleProps) {
  return (
    <div className={clsx(className)}>
      {url ? (
        <>
          <Permalink postUrl={postUrl} />{" "}
          <Link
            href={url}
            className="underline underline-offset-4 text-pea-green"
          >
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

interface DescriptionProps {
  body: TPost["body"];
  className?: string;
  fontSize?: "small" | "medium" | "large";
}

function Description({
  body,
  className,
  fontSize = "medium",
}: DescriptionProps) {
  const fontSizeClassNames = {
    small: "text-2",
    medium: "text-3",
    large: "text-5",
  };
  return (
    <div
      className={clsx(
        "markdown",
        fontSizeClassNames[fontSize],
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
            portfolioImage: (block: {
              value: {
                image: {
                  asset: {
                    url: string;
                    metadata: { dimensions: { width: number; height: number } };
                  };
                };
              };
            }) => {
              const url = block.value.image.asset.url;
              const { width, height } =
                block.value.image.asset.metadata.dimensions;
              return (
                <PortfolioImageComponent
                  src={url}
                  width={width}
                  height={height}
                  size="sm"
                  className="block-content"
                />
              );
            },
            video: (block: {
              value: { url: string; aspectRatio?: string };
            }) => {
              const { url } = block.value;
              const aspectRatio = block.value.aspectRatio || "16/9";
              return (
                <VideoComponent
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

interface PermalinkProps {
  postUrl: string;
  className?: string;
}

function Permalink({ postUrl, className }: PermalinkProps) {
  return (
    <Link href={postUrl} className={clsx(className)}>
      ¶
    </Link>
  );
}

interface TagListProps {
  tags: string[];
}

function TagList({ tags }: TagListProps) {
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

interface CollaboratorsProps {
  collaborators: TPost["collaborators"];
}

function Collaborators({ collaborators }: CollaboratorsProps) {
  if (!collaborators) return null;

  return (
    <div className="flex gap-em/2">
      <p className="">With</p>
      <ul className="list-none flex flex-wrap gap-em/2">
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
