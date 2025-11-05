import React from "react";
import { Dropdown, DropdownItem, ToggleSwitch } from "flowbite-react";
import { HiOutlineViewGrid, HiOutlineCog } from "react-icons/hi";
import { HiOutlineListBullet } from "react-icons/hi2";
import type { SettingKey } from "../@types/settingKey";

type LayoutBtnsProps = {
  layoutGrid: boolean;
  setLayoutGrid: React.Dispatch<React.SetStateAction<boolean>>;
  settings: Record<SettingKey, boolean>;
  handleSettingsChange: (key: SettingKey) => void;
};

export default function LayoutBtns({
  layoutGrid,
  setLayoutGrid,
  settings,
  handleSettingsChange,
}: LayoutBtnsProps) {
  const btns = [
    {
      title: "Grid",
      active: layoutGrid,
      Icon: HiOutlineViewGrid,
      onClick: () => setLayoutGrid(true),
    },
    {
      title: "List",
      active: !layoutGrid,
      Icon: HiOutlineListBullet,
      onClick: () => setLayoutGrid(false),
    },
  ];

  const labels: { key: SettingKey; label: string }[] = [
    { key: "fullDate", label: "Full date" },
    { key: "trackCount", label: "Track count" },
    { key: "genre", label: "Genre" },
    { key: "albumId", label: "Album ID" },
    { key: "upc", label: "UPC" },
    { key: "label", label: "Label" },
  ];

  return (
    <div className="flex gap-1">
      {btns.map(({ title, active, Icon, onClick }) => (
        <div
          key={title}
          className={`cursor-pointer rounded-sm p-1 hover:bg-gray-200 dark:hover:bg-gray-700 ${active ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          title={title}
          onClick={onClick}
        >
          <Icon className="size-6 dark:text-white" />
        </div>
      ))}

      <Dropdown
        label=""
        dismissOnClick={false}
        className="dark:bg-gray-600"
        renderTrigger={() => (
          <span
            className="cursor-pointer rounded-sm p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Settings"
          >
            <HiOutlineCog className="size-6 dark:text-white" />
          </span>
        )}
      >
        {labels.map(({ key, label }) => (
          <DropdownItem
            key={key}
            as={ToggleSwitch}
            checked={settings[key]}
            label={label}
            sizing="sm"
            className="rounded-none"
            onChange={() => handleSettingsChange(key)}
            onClick={() => handleSettingsChange(key)}
          />
        ))}
      </Dropdown>
    </div>
  );
}
