import React from "react";
import HeaderLeft from "./HeaderLeft";
import SearchContainer from "../search/SearchContainer";
import AuthButton from "../common/AuthButton";

const Header = () => (
  <div className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-white dark:bg-zinc-900 px-3 py-3 border-b border-gray-150 dark:border-zinc-800/80 dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)] text-black dark:text-white transition-colors duration-300">
    <div className="flex-shrink-0">
      <HeaderLeft />
    </div>
    <div className="flex-1 max-w-xl mx-2 md:mx-6">
      <SearchContainer />
    </div>
    <div className="flex-shrink-0">
      <AuthButton />
    </div>
  </div>
);

export default Header;
