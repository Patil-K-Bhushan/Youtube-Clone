import { useSelector, useDispatch } from "react-redux";
import SidebarItem from "./SidebarItem";
import { primaryItems } from "../../utils/sidebarItems";
import { toggleMenu } from "../../utils/appSlice";
import SidebarBackdrop from "./SidebarBackdrop";
import SidebarSections from "./SidebarSections";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    if (window.matchMedia("(max-width: 767px)").matches) dispatch(toggleMenu());
  };

  const asideClasses = [
    "fixed top-16 left-0 z-50 h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-zinc-900 shadow-md border-r border-gray-100 dark:border-zinc-800/80 text-gray-900 dark:text-zinc-100 transition-all duration-300",
    isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
    isMenuOpen ? "w-64 md:w-60 px-3 py-4" : "w-64 md:w-20 px-3 py-4 md:px-2",
  ].join(" ");

  return (
    <>
      <SidebarBackdrop isMenuOpen={isMenuOpen} />
      <aside className={asideClasses}>
        <ul className="space-y-2">
          {primaryItems.map(({ Icon, ActiveIcon, text, path }) => (
            <SidebarItem
              key={text}
              Icon={Icon}
              ActiveIcon={ActiveIcon}
              text={text}
              path={path}
              isMenuOpen={isMenuOpen}
              onNavigate={handleNavigate}
            />
          ))}
        </ul>
        <SidebarSections isMenuOpen={isMenuOpen} onNavigate={handleNavigate} />
      </aside>
    </>
  );
};

export default Sidebar;
