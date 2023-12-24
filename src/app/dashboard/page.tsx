"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLogin, isAdmin } from "../actions/auth";

export default function Dashboard() {
  const push = useRouter().push;

  useEffect(() => {
    (async () => {
      const check = await checkLogin();
      if (!check.success) {
        alert(check.message);
        return push("/login");
      } else {
        const admin = await isAdmin();
        if (!admin) {
          alert("Bạn không có quyền truy cập vào chức năng này!");
          return push("/");
        }
      }
    })();
  }, [push]);

  return <>Dashboard</>;
}
