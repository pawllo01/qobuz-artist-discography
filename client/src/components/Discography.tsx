import React from "react";
import {
  ToggleSwitch,
  Dropdown,
  DropdownItem,
  DropdownHeader,
} from "flowbite-react";
import LayoutBtns from "./LayoutBtns";
import Search from "./Search";
import AlbumCard from "./AlbumCard";
import { getFullTitle } from "../utils/albumUtils";
import type { Album } from "../@types/album";
import type { Store } from "../@types/store";
import type { SettingKey } from "../@types/settingKey";

type DiscographyProps = {
  albums: Album[];
  store: Store;
};

const sortOptions = [
  "Popularity",
  "Release date desc",
  "Release date asc",
  "A-Z",
  "Z-A",
];

export default function Discography({ albums, store }: DiscographyProps) {
  const [input, setInput] = React.useState<string>("");
  const [hiresOnly, setHiresOnly] = React.useState<boolean>(false);
  const [purchaseOnly, setPurchaseOnly] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>(
    () => localStorage.getItem("sort-by") || sortOptions[0],
  );
  const [layoutGrid, setLayoutGrid] = React.useState<boolean>(
    () => localStorage.getItem("layout-grid") !== "false",
  );
  const [settings, setSettings] = React.useState<Record<SettingKey, boolean>>(
    () =>
      JSON.parse(
        localStorage.getItem("settings") ||
          JSON.stringify({
            fullDate: true,
            trackCount: true,
            genre: false,
            albumId: false,
            upc: false,
            label: false,
          }),
      ),
  );

  React.useEffect(() => {
    localStorage.setItem("sort-by", sortBy);
  }, [sortBy]);

  React.useEffect(() => {
    localStorage.setItem("layout-grid", String(layoutGrid));
  }, [layoutGrid]);

  React.useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleSettingsChange = (key: SettingKey) => {
    setSettings((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const sortedAlbums = React.useMemo(() => {
    if (sortBy === "Popularity") return albums;

    return [...albums].sort((a, b) => {
      const fullTitleA = getFullTitle(a);
      const fullTitleB = getFullTitle(b);
      const isHires = +b.hires - +a.hires;
      const isExplicit = +b.parental_warning - +a.parental_warning;

      switch (sortBy) {
        case "Z-A":
          return (
            fullTitleB.localeCompare(fullTitleA) ||
            b.release_date_original.localeCompare(a.release_date_original) ||
            isHires ||
            isExplicit
          );
        case "A-Z":
          return (
            fullTitleA.localeCompare(fullTitleB) ||
            b.release_date_original.localeCompare(a.release_date_original) ||
            isHires ||
            isExplicit
          );
        case "Release date asc":
          return (
            a.release_date_original.localeCompare(b.release_date_original) ||
            fullTitleB.localeCompare(fullTitleA) ||
            isHires ||
            isExplicit
          );
        case "Release date desc":
        default:
          return (
            b.release_date_original.localeCompare(a.release_date_original) ||
            fullTitleB.localeCompare(fullTitleA) ||
            isHires ||
            isExplicit
          );
      }
    });
  }, [albums, sortBy]);

  const filteredAlbums = sortedAlbums.filter((album) => {
    if (hiresOnly && !album.hires) return false;
    if (purchaseOnly && (!album.purchasable || album.streamable)) return false;

    const searchText =
      `${getFullTitle(album)} ${album.parental_warning ? "explicit" : ""} ${album.release_date_original} ${album.upc} ${album.id}`.toLowerCase();
    return searchText.includes(input.trim().toLowerCase());
  });

  return (
    <section className="my-4">
      {/* heading + options */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-2xl leading-tight font-medium tracking-tight md:text-3xl dark:text-white">
          Discography - {filteredAlbums.length}&nbsp;releases
        </h3>
        <LayoutBtns
          layoutGrid={layoutGrid}
          setLayoutGrid={setLayoutGrid}
          settings={settings}
          handleSettingsChange={handleSettingsChange}
        />
      </div>

      {/* search */}
      <div className="my-3 flex flex-col gap-x-3 gap-y-2 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col gap-x-3 gap-y-2 lg:flex-row lg:items-center">
          <Search
            setInput={setInput}
            placeholder="Search by title, date, UPC or ID..."
            className="max-w-xl flex-1"
          />
          <ToggleSwitch
            label="Hi-Res only"
            className="w-fit"
            checked={hiresOnly}
            onChange={setHiresOnly}
          />
          <ToggleSwitch
            label="Purchase only"
            className="w-fit"
            checked={purchaseOnly}
            onChange={setPurchaseOnly}
          />
        </div>

        <Dropdown
          label={sortBy}
          dismissOnClick={false}
          className="min-w-45 justify-between"
        >
          <DropdownHeader>
            <span className="block text-sm font-medium">Sort by</span>
          </DropdownHeader>
          {sortOptions.map((opt, index) => (
            <DropdownItem key={index} onClick={() => setSortBy(opt)}>
              {opt}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>

      {/* not found */}
      {filteredAlbums.length === 0 && (
        <h3 className="text-2xl leading-tight font-medium tracking-tight md:text-3xl dark:text-white">
          No results found
        </h3>
      )}

      {/* album cards */}
      <div
        className={
          layoutGrid
            ? "grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] items-start gap-2"
            : "flex flex-col gap-3"
        }
      >
        {filteredAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            store={store}
            layoutGrid={layoutGrid}
            settings={settings}
          />
        ))}
      </div>
    </section>
  );
}
