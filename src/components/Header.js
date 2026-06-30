import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleMenu } from "../utils/appSlice";
import logo512 from "../assets/logo512.png";
import useGetSearchSuggestion from "../hooks/useGetSearchSuggestion";
import { Link } from "react-router-dom";

const Header = () => {
  const { searchQuery, setSearchQuery, suggestions } = useGetSearchSuggestion();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const runSearch = (query) => {
    const q = query.trim();
    if (!q) return;
    setShowSuggestions(false);
    navigate("/results?search_query=" + encodeURIComponent(q));
  };

  return (
    <div className="sticky top-0 z-30 grid grid-cols-3 items-center bg-white px-5 py-3 shadow-md">
      <div className="flex items-center gap-4">
        <RxHamburgerMenu
          size={28}
          className="cursor-pointer"
          onClick={() => dispatch(toggleMenu())}
        />
        <Link to="/"><img src={logo512} alt="Logo" className="h-10 cursor-pointer" /></Link>
      </div>

      <div className="relative w-full max-w-xl justify-self-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-l-full border border-gray-400 px-4 py-2 outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)} 
            onKeyDown={(e) => e.key === "Enter" && runSearch(searchQuery)}
          />
          <button
            onClick={() => runSearch(searchQuery)}
            className="flex items-center justify-center rounded-r-full border border-l-0 border-gray-400 bg-gray-100 px-6 py-2 hover:bg-gray-200"
          >
            <CiSearch size={24} />
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-12 z-40 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white py-2 shadow-lg">
            {suggestions.map((s) => (
              <li
                key={s}
                onClick={() => {
                  setSearchQuery(s);
                  runSearch(s);
                }}
                className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-gray-100"
              >
                <CiSearch size={18} className="text-gray-500" />
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="justify-self-end">
        <FaRegCircleUser size={30} className="cursor-pointer text-gray-700" />
      </div>
    </div>
  );
};

export default Header;
