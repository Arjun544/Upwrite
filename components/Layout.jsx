import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#0A2647]">{children}</div>
    </div>
  );
};

export default Layout;
