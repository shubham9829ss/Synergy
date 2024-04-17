import Sidebar from "./components/Sidebar/Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="flex gap-2">
      {/* <Sidebar /> */}
      <div className="w-3/4 absolute right-0 top-0">{children}</div>
    </div>
  );
};

export default Layout;
