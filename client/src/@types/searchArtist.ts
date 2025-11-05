export interface SearchArtist {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  albumsCount: number;
  url: string;
  url_encoded: string;
}
