import { useRef, useState, useEffect, useCallback } from "react";

const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();

    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
  };
};

export default useHorizontalScroll;
