import type { Album } from "../@types/album";

export function getFullTitle(album: Album): string {
  return `${album.title}${album.version ? ` (${album.version})` : ""}`;
}
