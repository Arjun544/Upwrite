import React from "react";
import Link from "next/link";

import {
  RiHome5Fill,
  RiChatHistoryFill,
  RiAddLine,
  RiLoginCircleFill,
} from "react-icons/ri";
import { SiUpwork } from "react-icons/si";

const Sidebar = () => {
  return (
    <div className="flex fixed py-4 w-full items-center justify-around bg-[#2D4263] gap-12">
      <Link href="/" className="text-primary mr-24">
        <SiUpwork size={45} />
      </Link>

      <div className="flex flex-row gap-8">
        <Link
          href="/"
          className="flex items-center gap-3 py-2 px-6 rounded-xl hover:bg-primary transition-all duration-300"
        >
          <RiHome5Fill size={26} className="text-white" />
          <h1 className="tracking-widest text-sm text-white">Home</h1>
        </Link>
        <Link
          href="/history"
          className="flex items-center gap-3 py-2 px-6 rounded-xl hover:bg-primary transition-all duration-300"
        >
          <RiChatHistoryFill size={26} className="text-white" />
          <h1 className="tracking-widest text-sm text-white">History</h1>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 py-2 px-6 rounded-xl hover:bg-primary transition-all duration-300"
        >
          <RiLoginCircleFill size={26} className="text-white" />
          <h1 className="tracking-widest text-sm text-white">Login</h1>
        </Link>
      </div>

      <div className="flex items-center justify-around h-12 rounded-xl gap-4 px-4 bg-primary cursor-pointer hover:bg-opacity-80 transition-all duration-300">
        <RiAddLine size={26} className="text-white" />
        <h1 className="text-white text-sm tracking-wider">New proposal</h1>
      </div>
    </div>
  );
};

export default Sidebar;
