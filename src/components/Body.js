import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div>
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
