import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
};

export default Layout;
