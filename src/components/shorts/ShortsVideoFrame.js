import { useEffect, useRef } from "react";

const ShortsVideoFrame = ({ short, isActive, isPlaying, isMuted }) => {
  const iframeRef = useRef(null);
  const videoId = short.originalId || short.id;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const postMsg = (func) => {
      try {
        iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func }), "*");
      } catch (e) {}
    };

    if (isActive) {
      postMsg(isPlaying ? "playVideo" : "pauseVideo");
      postMsg(isMuted ? "mute" : "unMute");
    } else {
      postMsg("pauseVideo");
    }
  }, [isActive, isPlaying, isMuted]);

  return isActive ? (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? "1" : "0"}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&enablejsapi=1`}
      title={short.title}
      className="h-full w-full object-cover pointer-events-none scale-105"
      allow="autoplay; encrypted-media; gyroscope"
      style={{ border: "none" }}
    />
  ) : (
    <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />
    </div>
  );
};

export default ShortsVideoFrame;
