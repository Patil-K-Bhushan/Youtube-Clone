import { NavLink } from "react-router-dom";

const SidebarItem = ({
  Icon,
  ActiveIcon,
  text,
  path,
  isMenuOpen = true,
  onNavigate,
}) => (
  <li>
    <NavLink
      to={path}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-gray-100 dark:bg-zinc-800 font-semibold text-gray-950 dark:text-white"
            : "font-normal text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800/60"
        } ${isMenuOpen ? "gap-5 px-3 py-2" : "flex-col justify-center py-3"}`
      }
    >
      {({ isActive }) => {
        const Glyph = isActive && ActiveIcon ? ActiveIcon : Icon;
        return (
          <>
            <Glyph className="shrink-0 text-xl" />
            <span className={isMenuOpen ? "text-sm" : "mt-1 text-xs"}>
              {text}
            </span>
          </>
        );
      }}
    </NavLink>
  </li>
);

export default SidebarItem;
