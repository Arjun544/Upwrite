import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SidebarTile = ({ item }) => {
  const router = useRouter();
  const [isShowingToolTip, setIsShowingToolTip] = useState(false);

  const handleShowToolTip = () => setIsShowingToolTip(true);
  const handleHideToolTip = () => setIsShowingToolTip(false);

  return (
    <div
      key={item.id}
      onMouseEnter={handleShowToolTip}
      onMouseLeave={handleHideToolTip}
      className="flex flex-col items-center"
    >
      <Link href={item.link} className="flex items-center justify-center">
        {item.icon}
      </Link>
      <div
        className={` ${
          router.asPath === item.link
            ? "h-2 w-8 mb-4 border-b-4 border-primary"
            : "mb-6"
        } transition-colors duration-300`}
      ></div>
      {isShowingToolTip && (
        <div className="flex absolute items-center justify-center -right-16 w-20 py-1 bg-dark rounded-lg">
          <span className="text-sm text-white">{item.name}</span>
        </div>
      )}
    </div>
  );
};

export default SidebarTile;