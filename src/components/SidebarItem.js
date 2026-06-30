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
            ? "bg-gray-100 font-semibold"
            : "font-normal hover:bg-gray-100"
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
