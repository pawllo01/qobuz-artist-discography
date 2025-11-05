import type { Album } from "./album";

export interface Artist {
  id: number;
  name: string;
  albums_as_primary_artist_count: number;
  albums_as_primary_composer_count: number;
  albums_count: number;
  slug: string;
  picture: null;
  image: Image | null;
  similar_artist_ids: number[];
  information: null;
  biography?: Biography;
  album_last_release?: Album;
  albums_without_last_release: Albumswithoutlastrelease;
}

interface Albumswithoutlastrelease {
  offset: number;
  limit: number;
  total: number;
  items: Album[];
}

interface Biography {
  summary: string;
  content: string;
  source: string;
  language: string;
}

interface Image {
  small: string;
  medium: string;
  large: string;
  extralarge: string;
  mega: string;
}
