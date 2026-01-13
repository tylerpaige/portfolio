import type { PortableTextBlock } from '@portabletext/types';

export interface SanityImageAsset {
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
  _id: string;
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
}

export interface PortfolioImage {
  _type: 'portfolioImage';
  _key: string;
  image: SanityImage;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'default';
  clickBehavior?: 'lightbox' | 'customUrl' | 'postUrl';
  url?: string;
}

export interface Video {
  _type: 'video';
  _key: string;
  url: string;
  aspectRatio?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'default';
}

export interface Embed {
  _type: 'embed';
  _key: string;
  code: string;
  aspectRatio?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'default';
}

export type MediaItem = PortfolioImage | Video | Embed;

export interface Collaborator {
  name: string;
  url?: string;
}

export interface Post {
  _id: string;
  title?: string;
  hideTitle?: boolean;
  url?: string;
  body: PortableTextBlock[];
  slug: {
    current: string;
  };
  featured?: boolean;
  publishedAt?: string;
  media: MediaItem[];
  tags?: string[];
  collaborators?: Collaborator[];
}

export interface FetchPostsParams {
  page?: number;
  tag?: string;
  featured?: boolean;
}

export interface FetchPostsError {
  status: string;
  type: string;
  message: string;
}

export interface FetchPostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage?: number;
  error?: FetchPostsError;
}
