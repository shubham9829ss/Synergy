import Sidebar from "./components/Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="flex gap-2">
      <Sidebar className="hidden sm:fixed sm:w-1/4" />
      <div className="w-full sm:w-3/4 absolute right-0 top-0">{children}</div>
    </div>
  );
};

export default Layout;
