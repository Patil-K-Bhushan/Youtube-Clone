import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../utils/appSlice";

const SidebarBackdrop = ({ isMenuOpen }) => {
  const dispatch = useDispatch();

  if (!isMenuOpen) return null;

  return (
    <div
      onClick={() => dispatch(toggleMenu())}
      className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/50 md:hidden"
    />
  );
};

export default SidebarBackdrop;
