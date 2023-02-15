import { AppContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const SidebarTile = ({ item }) => {
  const { setCurrentStep } = useContext(AppContext);
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
      <Link
        onClick={(e) => {
          if (item.link === "/") {
            setCurrentStep(1);
          }
        }}
        href={item.link}
        aria-label={item.name}
        className="flex items-center justify-center"
      >
        {item.icon}
      </Link>
      <div
        className={` ${
          router.asPath === item.link
            ? "h-2 w-8 mb-2 border-b-4 border-primary"
            : "mb-4"
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
