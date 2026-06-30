import React from "react";

const ScrollButton = ({ direction, onClick, Icon }) => {
  const isLeft = direction === "left";
  const gradientClass = isLeft
    ? "bg-gradient-to-r from-white to-transparent left-0"
    : "bg-gradient-to-l from-white to-transparent right-0";
  const buttonClass = isLeft ? "left-1" : "right-1";

  return (
    <>
      <div
        className={`pointer-events-none absolute inset-y-0 z-10 w-16 ${gradientClass}`}
      />
      <button
        onClick={onClick}
        aria-label={`Scroll ${direction}`}
        className={`absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-100 ${buttonClass}`}
      >
        <Icon size={24} />
      </button>
    </>
  );
};

export default ScrollButton;
