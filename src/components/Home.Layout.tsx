import React from "react";
import Header from "./Home.Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 bg-gray p-5">{children}</div>
    </div>
  );
};

export default Layout;
