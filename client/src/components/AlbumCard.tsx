import { Button, HR } from "flowbite-react";
import { HiPlay } from "react-icons/hi2";
import AlbumArtists from "./AlbumArtists";
import AudioQuality from "./AudioQuality";
import { getFullTitle } from "../utils/albumUtils";
import type { Album } from "../@types/album";
import type { Store } from "../@types/store";
import type { SettingKey } from "../@types/settingKey";

type AlbumCardProps = {
  album: Album;
  store: Store;
  layoutGrid: boolean;
  settings: Record<SettingKey, boolean>;
};

export default function AlbumCard({
  album,
  store,
  layoutGrid,
  settings,
}: AlbumCardProps) {
  const fixedUrl = album.url.replace("fr-fr", store);
  const fullTitle = getFullTitle(album);
  const cover = album.image?.large || "";
  const releaseDate = new Date(album.release_date_original);

  return (
    <div
      className={`w-full tracking-tight ${layoutGrid ? "max-w-2xs justify-self-center border border-gray-200 shadow-sm dark:border-gray-700" : "flex items-center border-t border-t-gray-300 pt-3 dark:border-t-gray-600"}`}
    >
      {/* cover + link */}
      <div
        className={`group relative overflow-hidden ${layoutGrid ? "" : "w-[clamp(100px,30vw,180px)] shrink-0 shadow-lg"}`}
      >
        <a href={fixedUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={cover}
            alt="Cover"
            className={`duration-300 group-hover:scale-105 dark:text-white ${
              layoutGrid
                ? "min-h-20 w-full border-b border-b-gray-200 dark:border-b-gray-700"
                : "w-full"
            }`}
          />
          {/* overlay */}
          <div className="absolute inset-0 flex items-end justify-end bg-black/50 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              as="a"
              href={`https://play.qobuz.com/album/${album.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 rounded-full p-0 duration-200 hover:scale-105"
              title="Listen online"
            >
              <HiPlay className="size-6" />
            </Button>
          </div>
        </a>
      </div>

      <div className={layoutGrid ? "p-2" : "flex-1 ps-3"}>
        <div className={layoutGrid ? "flex justify-between gap-1.5" : ""}>
          {/* title */}
          <h5 className="leading-tight font-medium tracking-normal dark:text-white">
            {/* do not remove the space below */}
            {fullTitle}{" "}
            {album.parental_warning && (
              <span className="mt-1 inline-block rounded-sm border border-red-600 px-2 py-0.5 text-xs font-bold text-red-600 select-none">
                Explicit
              </span>
            )}
          </h5>

          {/* audio quality for GRID layout */}
          {layoutGrid && <AudioQuality album={album} />}
        </div>

        <div className="space-y-0.5 text-gray-600 dark:text-gray-400">
          {/* album artists */}
          <AlbumArtists album={album} />

          <p>
            {/* release date */}
            {settings.fullDate
              ? releaseDate.toLocaleDateString()
              : releaseDate.getFullYear()}

            {/* track count */}
            {settings.trackCount &&
              ` • ${album.tracks_count} ${album.tracks_count > 1 ? "tracks" : "track"}`}

            {/* genre */}
            {settings.genre && album.genre && ` • ${album.genre.name}`}
          </p>

          {/* audio quality for LIST layout */}
          {!layoutGrid && <AudioQuality album={album} />}

          {/* additional info */}
          {layoutGrid &&
            (settings.albumId || settings.upc || settings.label) && (
              <HR className="my-0.5" />
            )}
          {settings.albumId && <p>ID: {album.id}</p>}
          {settings.upc && <p>UPC: {album.upc}</p>}
          {settings.label && <p>Label: {album.label.name}</p>}
        </div>
      </div>
    </div>
  );
}
