import { Toaster } from "react-hot-toast";
import React from "react";
import Sidebar from "./Sidebar";

interface Props {
  children: Array<React.ReactElement>;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen flex justify-start">
      <Toaster containerClassName="text-sm" />
      <Sidebar />
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
};

export default Layout;
