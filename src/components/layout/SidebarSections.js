import React from "react";
import SidebarItem from "./SidebarItem";
import { sections } from "../../utils/sidebarItems";

const SidebarSections = ({ isMenuOpen, onNavigate }) => {
  if (!isMenuOpen) return null;

  return sections.map(({ title, items }) => (
    <div key={title}>
      <hr className="my-4 border-gray-100 dark:border-zinc-800/80" />
      <h2 className="mb-2 px-3 text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-zinc-500">{title}</h2>
      <ul className="space-y-2">
        {items.map(({ Icon, ActiveIcon, text, path }) => (
          <SidebarItem
            key={text}
            Icon={Icon}
            ActiveIcon={ActiveIcon}
            text={text}
            path={path}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </div>
  ));
};

export default SidebarSections;
