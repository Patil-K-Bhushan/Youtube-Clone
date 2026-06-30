import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import categories from "../../utils/buttonCategories";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import { setActiveChip } from "../../utils/appSlice";
import ScrollButton from "./ScrollButton";

const ButtonList = () => {
  const { scrollRef, canScrollLeft, canScrollRight, scroll } =
    useHorizontalScroll();
  const activeChip = useSelector((store) => store.app.activeChip);
  const dispatch = useDispatch();

  return (
    <div className="sticky top-16 z-10 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="relative">
        {canScrollLeft && (
          <ScrollButton
            direction="left"
            onClick={() => scroll("left")}
            Icon={MdChevronLeft}
          />
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
          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            Icon={MdChevronRight}
          />
        )}
      </div>
    </div>
  );
};

export default ButtonList;
