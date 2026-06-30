import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../utils/appSlice";
import logo512 from "../../assets/logo512.png";

const HeaderLeft = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => dispatch(toggleMenu())}
        className="cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-zinc-850 active:scale-95 transition-all text-gray-700 dark:text-zinc-200"
        aria-label="Toggle sidebar"
      >
        <RxHamburgerMenu size={20} />
      </button>
      <Link to="/" className="flex items-center gap-1.5 ml-2">
        <img src={logo512} alt="Logo" className="h-9 cursor-pointer" />
        <span className="font-bold text-lg tracking-tighter hidden sm:inline-block font-sans text-gray-900 dark:text-white">
          YouTube
        </span>
      </Link>
    </div>
  );
};

export default HeaderLeft;
