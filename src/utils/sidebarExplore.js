import {
  MdOutlineLocalFireDepartment,
  MdLocalFireDepartment,
  MdOutlineSportsEsports,
  MdSportsEsports,
  MdOutlineMovie,
  MdMovie,
} from "react-icons/md";
import { FaMusic } from "react-icons/fa";

export const exploreSection = {
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
};
