import React from "react";
import Sidebar from "./Dashboard.Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen gap-5 bg-gray">
      <Sidebar />
      <div className="flex-1 rounded-l-box bg-white p-5">{children}</div>
    </div>
  );
};

export default Layout;
