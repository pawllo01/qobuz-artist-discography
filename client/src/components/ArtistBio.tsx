import { Button } from "flowbite-react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlinePlay } from "react-icons/hi2";
import BiographyModal from "./BiographyModal";
import type { Artist } from "./../@types/artist";
import type { Store } from "../@types/store";

type ArtistBioProps = {
  artist: Artist;
  store: Store;
};

export default function ArtistBio({ artist, store }: ArtistBioProps) {
  return (
    <section className="my-4 rounded-xl bg-gray-700 p-6 shadow-lg">
      <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between md:gap-x-6">
        <div className="shrink-0 md:order-1">
          {/* avatar */}
          <img
            src={artist.image ? artist.image.medium : "/default_artist.svg"}
            alt="Avatar"
            className="size-32 justify-self-center rounded-full object-cover md:size-42"
          />
        </div>

        <div className="space-y-2">
          {/* name */}
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {artist.name}
          </h2>

          {/* id */}
          <p className="text-gray-300">ID: {artist.id}</p>

          {/* biography */}
          <BiographyModal artist={artist} />

          {/* button links */}
          <div className="flex flex-wrap gap-2">
            <Button
              as="a"
              href={`https://www.qobuz.com/${store}/interpreter/${artist.slug}/${artist.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit min-w-28"
            >
              <HiOutlineShoppingBag className="mr-1 size-6" />
              Store
            </Button>

            <Button
              as="a"
              href={`https://play.qobuz.com/artist/${artist.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit min-w-28"
            >
              <HiOutlinePlay className="mr-1 size-6" />
              Listen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
