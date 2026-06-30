import {
  MdOutlineHome,
  MdHome,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";

export const primaryItems = [
  { Icon: MdOutlineHome, ActiveIcon: MdHome, text: "Home", path: "/" },
  {
    Icon: SiYoutubeshorts,
    ActiveIcon: SiYoutubeshorts,
    text: "Shorts",
    path: "/feed/shorts",
  },
];
