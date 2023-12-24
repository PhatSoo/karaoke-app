"use client";

import { logout } from "@/app/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const menu = [
  {
    title: "Danh sách bàn",
    link: "/",
  },
];

const Header = () => {
  const push = useRouter().push;
  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (await logout()) {
      push("/login");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div>
        <a className="btn btn-ghost text-xl">Chức năng</a>
      </div>
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1">
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Header;
