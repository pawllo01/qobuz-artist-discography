export interface Album {
  maximum_bit_depth: number;
  image: Image;
  media_count: number;
  artist: MainArtist;
  artists: Artist[];
  upc: string;
  released_at: number;
  label: Label;
  title: string;
  qobuz_id: number;
  version: string | null;
  url: string;
  slug: string;
  duration: number;
  parental_warning: boolean;
  popularity: number;
  tracks_count: number;
  genre: Genre;
  maximum_channel_count: number;
  id: string;
  maximum_sampling_rate: number;
  articles: unknown[];
  release_date_original: string;
  release_date_download: string;
  release_date_stream: string;
  purchasable: boolean;
  streamable: boolean;
  previewable: boolean;
  sampleable: boolean;
  downloadable: boolean;
  displayable: boolean;
  purchasable_at: number | null;
  streamable_at: number;
  hires: boolean;
  hires_streamable: boolean;
  description?: unknown[];
}

interface Genre {
  path: number[];
  color: string;
  name: string;
  id: number;
  slug: string;
}

interface Label {
  name: string;
  id: number;
  albums_count: number;
  supplier_id: number;
  slug: string;
}

interface Artist {
  id: number;
  name: string;
  roles: string[];
}

interface MainArtist {
  image: null;
  name: string;
  id: number;
  albums_count: number;
  slug: string;
  picture: null;
}

interface Image {
  small: string | null;
  thumbnail: string | null;
  large: string | null;
  back: string | null;
}
