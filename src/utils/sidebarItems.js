import {
  MdOutlineHome,
  MdHome,
  MdOutlineSubscriptions,
  MdSubscriptions,
  MdOutlineLocalFireDepartment,
  MdLocalFireDepartment,
  MdOutlineSportsEsports,
  MdSportsEsports,
  MdOutlineMovie,
  MdMovie,
  MdOutlineHistory,
  MdHistory,
  MdOutlineWatchLater,
  MdWatchLater,
  MdOutlineThumbUp,
  MdThumbUp,
  MdOutlineVideoLibrary,
  MdVideoLibrary,
  MdOutlineSettings,
  MdSettings,
  MdOutlineFeedback,
  MdFeedback,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { FaMusic } from "react-icons/fa";

export const primaryItems = [
  { Icon: MdOutlineHome, ActiveIcon: MdHome, text: "Home", path: "/" },
  {
    Icon: SiYoutubeshorts,
    ActiveIcon: SiYoutubeshorts,
    text: "Shorts",
    path: "/feed/shorts",
  },
  {
    Icon: MdOutlineSubscriptions,
    ActiveIcon: MdSubscriptions,
    text: "Subscriptions",
    path: "/feed/subscriptions",
  },
];

export const sections = [
  {
    title: "Explore",
    items: [
      {
        Icon: MdOutlineLocalFireDepartment,
        ActiveIcon: MdLocalFireDepartment,
        text: "Trending",
        path: "/feed/trending",
      },
      {
        Icon: FaMusic,
        ActiveIcon: FaMusic,
        text: "Music",
        path: "/feed/music",
      },
      {
        Icon: MdOutlineSportsEsports,
        ActiveIcon: MdSportsEsports,
        text: "Gaming",
        path: "/feed/gaming",
      },
      {
        Icon: MdOutlineMovie,
        ActiveIcon: MdMovie,
        text: "Movies",
        path: "/feed/movies",
      },
    ],
  },
  {
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
  },
  {
    title: "Settings",
    items: [
      {
        Icon: MdOutlineSettings,
        ActiveIcon: MdSettings,
        text: "Settings",
        path: "/feed/settings",
      },
      {
        Icon: MdOutlineFeedback,
        ActiveIcon: MdFeedback,
        text: "Send Feedback",
        path: "/feed/feedback",
      },
    ],
  },
];
