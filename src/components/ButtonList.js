import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import categories from "../utils/buttonCategories";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { setActiveChip } from "../utils/appSlice";

const ButtonList = () => {
  const { scrollRef, canScrollLeft, canScrollRight, scroll } =
    useHorizontalScroll();
  const activeChip = useSelector((store) => store.app.activeChip);
  const dispatch = useDispatch();

  return (
    <div className="sticky top-16 z-10 bg-white">
      <div className="relative">
        {canScrollLeft && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-100"
            >
              <MdChevronLeft size={24} />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto whitespace-nowrap px-4 py-3 no-scrollbar"
        >
          {categories.map((item) => (
            <Button
              key={item}
              name={item}
              selected={item === activeChip}
              onClick={() => dispatch(setActiveChip(item))}
            />
          ))}
        </div>

        {canScrollRight && (
          <>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-100"
            >
              <MdChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonList;
