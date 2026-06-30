import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import useGetSearchSuggestion from "../../hooks/useGetSearchSuggestion";
import SearchSuggestions from "./SearchSuggestions";

const SearchContainer = () => {
  const { searchQuery, setSearchQuery, suggestions } = useGetSearchSuggestion();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const runSearch = (query) => {
    const q = query.trim();
    if (!q) return;
    setShowSuggestions(false);
    navigate("/results?search_query=" + encodeURIComponent(q));
  };

  const handleSelectSuggestion = (s) => {
    setSearchQuery(s);
    runSearch(s);
  };

  return (
    <div className="relative w-full max-w-xl justify-self-center">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-l-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-blue-500 dark:focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-zinc-500 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          onKeyDown={(e) => e.key === "Enter" && runSearch(searchQuery)}
        />
        <button
          onClick={() => runSearch(searchQuery)}
          className="flex items-center justify-center rounded-r-full border border-l-0 border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-750 px-6 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 transition-colors"
        >
          <CiSearch size={20} />
        </button>
      </div>

      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={handleSelectSuggestion}
        />
      )}
    </div>
  );
};

export default SearchContainer;
