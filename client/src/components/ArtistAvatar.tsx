import type { SearchArtist } from "../@types/searchArtist";

type ArtistAvatarProps = {
  searchArtist: SearchArtist;
};

export default function ArtistAvatar({ searchArtist }: ArtistAvatarProps) {
  const isSelected =
    String(searchArtist.id) === window.location.hash.replace("#", "");

  return (
    <a
      href={`#${searchArtist.id}`}
      className={`block rounded-lg p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 ${
        isSelected ? "bg-gray-200 dark:bg-gray-700" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          className="size-15 rounded-full object-cover"
          src={searchArtist.image || "/default_artist.svg"}
          alt=""
        />
        <div className="font-medium dark:text-white">
          <div>{searchArtist.name}</div>
          {/* <div className="text-sm text-gray-500 dark:text-gray-400">
            {searchArtist.albumsCount} releases
          </div> */}
        </div>
      </div>
    </a>
  );
}
