import React from "react";
import { Alert, Spinner } from "flowbite-react";
import Header from "./components/Header";
import SearchArtist from "./components/SearchArtist";
import ArtistBio from "./components/ArtistBio";
import Discography from "./components/Discography";
import FooterComponent from "./components/FooterComponent";
import type { Artist } from "./@types/artist";
import type { Store } from "./@types/store";

export default function App() {
  const [hash, setHash] = React.useState<string>("");
  const [artist, setArtist] = React.useState<Artist | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [store, setStore] = React.useState<Store>((): Store => {
    return (localStorage.getItem("store") as Store | null) || "gb-en";
  });
  const artistCache = React.useRef<Record<string, Artist>>({});

  // https://stackoverflow.com/questions/77504778/how-do-i-activate-an-effect-if-the-urls-hash-changes
  React.useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.replace("#", ""));
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  React.useEffect(() => {
    if (!hash) return;
    if (!/^\d+$/.test(hash)) {
      setError("Invalid artist ID. It must contain only digits.");
      return;
    }
    setError("");

    // cached artist
    const cacheKey = `${store}:${hash}`;
    if (artistCache.current[cacheKey]) {
      setArtist(artistCache.current[cacheKey]);
      return;
    }

    // fetch artist
    const fetchArtist = async (id: string) => {
      setIsLoading(true);
      try {
        const url = `${import.meta.env.VITE_BASE_API_URL}/artist/${id}?store=${store}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        artistCache.current[cacheKey] = data;
        setArtist(data);
      } catch (error) {
        setArtist(null);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist(hash);
  }, [hash, store]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto my-2 flex w-full max-w-7xl grow flex-col gap-4 p-3 md:p-4">
        <Header store={store} setStore={setStore} />

        <SearchArtist store={store} setError={setError} />

        {error && (
          <Alert color="failure" className="text-md font-medium">
            Error: {error}
          </Alert>
        )}

        {isLoading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}

        {!hash && !artist && (
          <div className="mt-16 p-4" style={{ height: "50vh" }}>
            <img
              src="/undraw_people-search.svg"
              alt="People search"
              className="mx-auto max-h-full select-none"
            />
          </div>
        )}

        {artist && <ArtistBio artist={artist} store={store} />}

        {artist && (
          <Discography
            albums={artist.albums_without_last_release.items}
            store={store}
          />
        )}
      </main>

      <FooterComponent />
    </div>
  );
}
