"use client";
import { useEffect } from "react";
import { checkLogin, isAdmin } from "../actions/auth";
import { useRouter } from "next/navigation";
import Header from "../../components/Home.Header";
import Layout from "../../components/Home.Layout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const push = useRouter().push;

  useEffect(() => {
    (async () => {
      const check = await checkLogin();
      if (!check.success) {
        alert(check.message);
        return push("/login");
      } else {
        const admin = await isAdmin();
        if (admin) {
          return push("/dashboard");
        }
      }
    })();
  }, [push]);

  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}
