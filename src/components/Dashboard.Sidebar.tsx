"use client";
import { logout } from "@/app/actions/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const menu = [
  {
    name: "Dashboard",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    link: "/dashboard",
  },
  {
    name: "Quản lý Sản phẩm",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    ),
    link: "/dashboard/products",
  },
  {
    name: "Quản lý Nhân viên",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    link: "/dashboard/employees",
  },
  {
    name: "Quản lý Phòng",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    link: "/dashboard/rooms",
  },
];

const Sidebar = () => {
  const push = useRouter().push;
  const pathname = usePathname();

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (await logout()) {
      push("/login");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <ul className="menu menu-lg flex h-screen w-80 flex-col justify-between rounded-r-box bg-base-200">
      <div>
        <div className="mb-5 text-center ">
          <a className="btn btn-neutral text-xl">Karaoke Management</a>
        </div>
        {menu.map((item, idx) => (
          <li
            key={idx}
            className={
              pathname === item.link ? "rounded-xl bg-primary text-black" : ""
            }
          >
            <Link href={item.link}>
              {item.svg}
              {item.name}
            </Link>
          </li>
        ))}
      </div>

      <div className="mb-5 text-center">
        <button
          className="btn btn-secondary w-60 text-xl"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </ul>
  );
};

export default Sidebar;
