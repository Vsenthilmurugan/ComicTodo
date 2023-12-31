"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { serverAPI } from "../common/serverAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Preloader from "../components/Loader/Preloader";
import { handleUpdateTheme } from "../common/utilities";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const router = useRouter();
  const userToken = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    serverAPI.userLogin(data.email, data.password).then((res) => {
      if (res != undefined) {
        toast.success(res.data.data.message);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("uid", res.data.data.uid);
        localStorage.setItem("theme", res.data.data.theme);
          handleUpdateTheme(res.data.data.theme, dispatch);
        router.push("/userTodo");
      }
    });
  };

  useEffect(() => {
    if (!!userToken && !!uid) {
      router.push("/userTodo");
    }
  }, []);
  return (
    <div className="sm:h-96 lg:h-screen flex items-center justify-center">
      {!!userToken && !!uid ? (
        <Preloader />
      ) : (
        <div className="container mx-auto p-4 flex flex-col md:flex-row">
          <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black rounded-l-2xl">
            <img
              src={"/loginlogo.png"}
              alt="logo"
              width={"100%"}
              height={"100%"}
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>
          <div className="w-full lg:rounded-l-none rounded-l-2xl bg-comic-cover bg-contain lg:w-1/2 flex items-center justify-center rounded-r-2xl py-5 h-[544px]">
            <div className="bg-white rounded-2xl">
              <div className="max-w-lg w-full p-6">
                <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                  Sign In
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          id="email"
                          {...field}
                          className={`mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="password"
                          id="password"
                          {...field}
                          className={`mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  >
                    Sign In
                  </button>
                </form>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>
                    Don't have an account?{" "}
                    <Link href="/signUp" className="text-black hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
