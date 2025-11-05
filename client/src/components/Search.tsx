import React from "react";
import { Label, TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";

type SearchProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  className?: string;
};

export default function Search({
  setInput,
  placeholder,
  className,
}: SearchProps) {
  return (
    <div className={className}>
      <div className="mb-2 block text-center" hidden>
        <Label htmlFor="search-artist">Search</Label>
      </div>
      <TextInput
        id="search-artist"
        type="search"
        icon={HiOutlineSearch}
        placeholder={placeholder}
        required
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
