import { useSelector, useDispatch } from "react-redux";
import ShortsPlayer from "./ShortsPlayer";
import ShortsComments from "./ShortsComments";
import { toggleMute, setCommentsOpen } from "../../utils/shortsSlice";

const ShortsFeedItem = ({ short, idx }) => {
  const dispatch = useDispatch();
  const { activeIndex, isMuted, isCommentsOpen } = useSelector((store) => store.shorts);
  const isActive = idx === activeIndex;

  return (
    <div className="flex h-full w-full flex-shrink-0 snap-start items-center justify-center py-2 md:py-6 bg-zinc-950">
      <div className="flex flex-row items-center justify-center bg-black md:rounded-2xl shadow-2xl overflow-hidden max-w-full">
        <ShortsPlayer
          short={short}
          isActive={isActive}
          isMuted={isMuted}
          onMuteToggle={() => dispatch(toggleMute())}
          onCommentsToggle={() => dispatch(setCommentsOpen(!isCommentsOpen))}
          isCommentsOpen={isCommentsOpen}
        />
        {isActive && isCommentsOpen && (
          <div className="hidden md:block w-[360px] lg:w-[400px] h-[640px] md:h-[680px] flex-shrink-0 animate-slide-in">
            <ShortsComments
              videoId={short.originalId || short.id}
              onClose={() => dispatch(setCommentsOpen(false))}
            />
          </div>
        )}
      </div>
      {isCommentsOpen && isActive && (
        <div className="fixed inset-x-0 bottom-0 z-50 h-[70vh] bg-zinc-900 rounded-t-2xl shadow-2xl md:hidden animate-slide-up">
          <ShortsComments
            videoId={short.originalId || short.id}
            onClose={() => dispatch(setCommentsOpen(false))}
          />
        </div>
      )}
    </div>
  );
};

export default ShortsFeedItem;
