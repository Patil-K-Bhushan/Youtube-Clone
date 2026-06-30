import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchSuggestions = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute top-12 z-40 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 py-2 shadow-lg dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
      {suggestions.map((s) => (
        <li
          key={s}
          onClick={() => onSelect(s)}
          className="flex cursor-pointer items-center gap-4 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-800 dark:text-zinc-200"
        >
          <CiSearch size={18} className="text-gray-400 dark:text-zinc-500" />
          <span className="text-sm">{s}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
