import React from "react";
import { Spinner } from "flowbite-react";
import Search from "./Search";
import ArtistAvatar from "./ArtistAvatar";
import type { Store } from "../@types/store";
import type { SearchArtist } from "../@types/searchArtist";

type SearchArtistProps = {
  store: Store;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

type SearchData = {
  artists?: SearchArtist[];
};

export default function SearchArtist({ store, setError }: SearchArtistProps) {
  const [input, setInput] = React.useState<string>("");
  const [deferredInput, setDeferredInput] = React.useState<string>("");
  const [searchData, setSearchData] = React.useState<SearchData>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => setDeferredInput(input), 500);
    return () => clearTimeout(timeoutId);
  }, [input]);

  React.useEffect(() => {
    if (!deferredInput) return;

    setError("");
    setSearchData({});
    setIsLoading(true);

    const fetchArtists = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_API_URL}/search?q=${deferredInput}&store=${store}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setSearchData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [deferredInput, setError, store]);

  return (
    <div className="space-y-4">
      <Search
        setInput={setInput}
        placeholder="Search artist by name or ID..."
        className="lg:mx-auto lg:max-w-2xl"
      />

      {isLoading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}

      {searchData.artists &&
        (searchData.artists.length > 0 ? (
          <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:justify-center">
            {searchData.artists.map((artist) => (
              <ArtistAvatar key={artist.id} searchArtist={artist} />
            ))}
          </div>
        ) : (
          <h3 className="text-center text-xl font-medium dark:text-white">
            No results found
          </h3>
        ))}
    </div>
  );
}
