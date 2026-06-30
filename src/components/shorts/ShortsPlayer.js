import { useState } from "react";
import ShortsVideoFrame from "./ShortsVideoFrame";
import ShortsActionButtons from "./ShortsActionButtons";
import ShortsMetaOverlay from "./ShortsMetaOverlay";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";

const ShortsPlayer = ({ short, isActive, isMuted, onMuteToggle, onCommentsToggle, isCommentsOpen }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleShareCopy = () => {
    const videoUrl = `${window.location.origin}/watch?v=${short.originalId || short.id}`;
    navigator.clipboard.writeText(videoUrl).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-end justify-center w-full h-[calc(100vh-80px)] md:h-[700px] select-none py-1 md:py-4">
      {showToast && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900/90 backdrop-blur border border-white/10 px-4 py-2 text-xs text-white shadow-xl">
          Link copied to clipboard!
        </div>
      )}
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        className={`relative aspect-[9/16] h-full w-full sm:w-[380px] max-h-[640px] md:max-h-[680px] bg-black md:rounded-l-2xl ${
          isCommentsOpen ? "md:rounded-r-none" : "md:rounded-r-2xl"
        } overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.6)] border border-white/5 flex-shrink-0 cursor-pointer`}
      >
        <ShortsVideoFrame short={short} isActive={isActive} isPlaying={isPlaying} isMuted={isMuted} />
        <button
          onClick={(e) => { e.stopPropagation(); onMuteToggle(); }}
          className="absolute right-4 top-4 z-30 rounded-full bg-black/45 backdrop-blur-md border border-white/10 p-2.5 text-white hover:bg-black/75 transition-colors shadow-lg active:scale-95"
        >
          {isMuted ? <MdVolumeOff className="text-lg" /> : <MdVolumeUp className="text-lg" />}
        </button>
        <div className="absolute bottom-20 right-3 z-20 md:hidden flex flex-col items-center gap-4">
          <ShortsActionButtons short={short} isCommentsOpen={isCommentsOpen} onCommentsToggle={onCommentsToggle} onShareCopy={handleShareCopy} isMobile={true} />
        </div>
        <ShortsMetaOverlay short={short} isPlaying={isPlaying} isActive={isActive} />
        {isActive && isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/20">
            <div className="h-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] animate-pulse" style={{ width: "100%" }} />
          </div>
        )}
      </div>
      <div className="hidden md:flex flex-col items-center gap-4 ml-4 pb-2">
        <ShortsActionButtons short={short} isCommentsOpen={isCommentsOpen} onCommentsToggle={onCommentsToggle} onShareCopy={handleShareCopy} isMobile={false} />
      </div>
    </div>
  );
};

export default ShortsPlayer;
