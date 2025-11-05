import type { Album } from "../@types/album";

type AlbumArtistsProps = {
  album: Album;
};

export default function AlbumArtists({ album }: AlbumArtistsProps) {
  return (
    <p>
      {album.artists.map((artist, index) => (
        <span key={artist.id}>
          <a
            href={`#${artist.id}`}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            {artist.name}
          </a>
          {index < album.artists.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}
