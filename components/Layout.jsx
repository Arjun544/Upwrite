import Sidebar from "./Sidebar";
import {Toaster} from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex justify-start">
      <Toaster containerClassName="text-sm" />
      <Sidebar />
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
};

export default Layout;
