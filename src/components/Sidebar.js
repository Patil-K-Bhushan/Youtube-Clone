import { useSelector, useDispatch } from "react-redux";
import SidebarItem from "./SidebarItem";
import { primaryItems, sections } from "../utils/sidebarItems";
import { toggleMenu } from "../utils/appSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    if (window.matchMedia("(max-width: 767px)").matches) dispatch(toggleMenu());
  };

  const asideClasses = [
    "fixed top-16 left-0 z-50 h-[calc(100vh-64px)] overflow-y-auto bg-white shadow-md transition-all duration-300",
    isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
    isMenuOpen ? "w-64 md:w-60 px-3 py-4" : "w-64 md:w-20 px-3 py-4 md:px-2",
  ].join(" ");

  return (
    <>
      {isMenuOpen && (
        <div
          onClick={() => dispatch(toggleMenu())}
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/50 md:hidden"
        />
      )}

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

        {isMenuOpen &&
          sections.map(({ title, items }) => (
            <div key={title}>
              <hr className="my-4" />
              <h2 className="mb-2 px-3 font-semibold text-gray-700">{title}</h2>
              <ul className="space-y-2">
                {items.map(({ Icon, ActiveIcon, text, path }) => (
                  <SidebarItem
                    key={text}
                    Icon={Icon}
                    ActiveIcon={ActiveIcon}
                    text={text}
                    path={path}
                    onNavigate={handleNavigate}
                  />
                ))}
              </ul>
            </div>
          ))}
      </aside>
    </>
  );
};

export default Sidebar;
