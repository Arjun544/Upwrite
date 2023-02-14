import React, { useState } from "react";
import Link from "next/link";

import {
  RiHome5Fill,
  RiChatHistoryFill,
  RiAddLine,
  RiLoginCircleFill,
} from "react-icons/ri";
import { SiUpwork } from "react-icons/si";
import SidebarTile from "./Sidebar_Tile";

const Sidebar = () => {
  const [isShowingToolTip, setIsShowingToolTip] = useState(false);

  const handleShowToolTip = () => setIsShowingToolTip(true);
  const handleHideToolTip = () => setIsShowingToolTip(false);

  const items = [
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
      link: "/login",
      name: "Login",

      icon: <RiLoginCircleFill size={26} className="text-dark" />,
    },
  ];

  return (
    <div className="flex flex-col h-full relative items-center justify-between px-4 py-4 bg-white border-r-2">
      <div className="flex flex-col gap-10 ">
        <Link href="/" className="text-primary">
          <SiUpwork size={45} />
        </Link>
        {items.map((item) => (
          <SidebarTile key={item.id} item={item} />
        ))}
      </div>
      <div
        onMouseEnter={handleShowToolTip}
        onMouseLeave={handleHideToolTip}
        className="flex items-center relative justify-around h-12 rounded-xl gap-4 px-4 bg-primary cursor-pointer hover:bg-opacity-80 transition-all duration-300"
      >
        <RiAddLine size={26} className="text-white" />
        {isShowingToolTip && (
          <div className="flex absolute items-center justify-center left-16 w-32 py-1 bg-dark rounded-lg">
            <span className="text-sm text-white">New Proposal</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
