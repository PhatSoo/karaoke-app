"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const checkLogin = () => {
  const token = cookies().get("token");

  if (!token) {
    return { success: false, message: "Bạn chưa đăng nhập" };
  }
  return { success: true, isAdmin: token.value };
};

export const isAdmin = () => {
  const token = cookies().get("token");
  if (token) {
    const decoded: { [key: string]: string } = jwtDecode(token.value);

    if (decoded.isAdmin) {
      return true;
    }
    return false;
  }
};

export const login = async (data: { username: string; password: string }) => {
  return fetch(`${process.env.API_SERVER}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  })
    .then((r) => r.json())
    .then((res) => {
      if (res.success) {
        // const oneHour = 60 * 60 * 1000;
        const decoded: { [key: string]: string } = jwtDecode(res.token);

        cookies().set("token", res.token, {
          expires: new Date(parseInt(decoded.exp) * 1000),
        });

        return { success: true, isAdmin: decoded.isAdmin };
      } else {
        return res;
      }
    });
};

export const logout = async () => {
  cookies().delete("token");
  return true;
};
