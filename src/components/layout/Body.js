import { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const darkMode = useSelector((store) => store.app.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300">
      <Header />
      <Sidebar />
      <div
        className={`transition-all duration-300 ${isMenuOpen ? "pl-0 md:pl-60" : "pl-0 md:pl-20"}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
