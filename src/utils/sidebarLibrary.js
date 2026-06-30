import {
  MdOutlineHistory,
  MdHistory,
  MdOutlineWatchLater,
  MdWatchLater,
  MdOutlineThumbUp,
  MdThumbUp,
  MdOutlineVideoLibrary,
  MdVideoLibrary,
} from "react-icons/md";

export const librarySection = {
  title: "Library",
  items: [
    {
      Icon: MdOutlineHistory,
      ActiveIcon: MdHistory,
      text: "History",
      path: "/feed/history",
    },
    {
      Icon: MdOutlineWatchLater,
      ActiveIcon: MdWatchLater,
      text: "Watch Later",
      path: "/feed/watch-later",
    },
    {
      Icon: MdOutlineThumbUp,
      ActiveIcon: MdThumbUp,
      text: "Liked Videos",
      path: "/feed/liked",
    },
    {
      Icon: MdOutlineVideoLibrary,
      ActiveIcon: MdVideoLibrary,
      text: "Your Videos",
      path: "/feed/your-videos",
    },
  ],
};
