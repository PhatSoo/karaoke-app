"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../components/Toast";
import { checkLogin, isAdmin, login } from "../actions/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadOK, setLoadOK] = useState(false);

  const [toast, setToast] = useState({ toastType: "", toastMessage: "" });

  const push = useRouter().push;

  useEffect(() => {
    (async () => {
      const check = await checkLogin();
      if (check.success) {
        const admin = await isAdmin();
        if (admin) {
          return push("/dashboard");
        }
        return push("/");
      }
    })();
  }, [push]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const result = await login({ username, password });

    if (result.success) {
      if (result.isAdmin) {
        return push("/dashboard");
      }
      return push("/");
    } else {
      setLoadOK(true);
      setToast({ toastType: "info", toastMessage: result.message });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col items-center justify-center  px-6 py-12 lg:px-8">
        <div className="w-[50rem] rounded bg-gray-dark py-5">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            />
            <h2 className="text-gray-900 mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-info w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-gray-900 block text-sm font-medium leading-6"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered input-info w-full"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="hover:bg-indigo-500 btn btn-info btn-active w-[20rem] shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {loadOK && <Toast type={toast.toastType} message={toast.toastMessage} />}
    </>
  );
};

export default Login;
