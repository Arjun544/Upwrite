import { NavItem } from "./types";
import {
  RiHome5Fill,
  RiChatHistoryFill,
  RiInformationFill,
} from "react-icons/ri";

export const navItems: Array<NavItem> = [
  {
    id: 1,
    link: "/",
    name: "Home",
    icon: <RiHome5Fill size={26} className="text-dark" />,
  },
  {
    id: 2,
    link: "/history",
    name: "History",
    icon: <RiChatHistoryFill size={26} className="text-dark" />,
  },
  {
    id: 3,
    link: "/about",
    name: "About",
    icon: <RiInformationFill size={26} className="text-dark" />,
  },
];
