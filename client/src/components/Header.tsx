import React from "react";
import { DarkThemeToggle } from "flowbite-react";
import StoresModal from "./StoresModal";
import type { Store } from "../@types/store";

type HeaderProps = {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
};

export default function Header({ store, setStore }: HeaderProps) {
  return (
    <header className="relative mt-2 mb-4 flex flex-col items-center justify-between gap-x-4 gap-y-3 min-[400px]:flex-row lg:mb-8 lg:justify-center">
      <h1 className="pb-1 text-xl leading-none font-extrabold tracking-tight sm:text-3xl md:pb-1.5 md:text-4xl lg:text-5xl dark:text-white">
        Qobuz Artist Discography
      </h1>

      <div className="flex shrink-0 gap-2 lg:absolute lg:right-0">
        <DarkThemeToggle className="cursor-pointer outline outline-gray-200 dark:outline-gray-600" />
        <StoresModal store={store} setStore={setStore} />
      </div>
    </header>
  );
}
