"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { serverAPI } from "../common/serverAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Preloader from "../components/Loader/Preloader";
import { useDispatch } from "react-redux";
import { handleUpdateTheme } from "../common/utilities";

const SignUp = () => {
  const userToken = typeof window !== 'undefined' ?localStorage.getItem("token"):null;
  const uid = typeof window !== 'undefined' ?localStorage.getItem("uid"):null;
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    serverAPI
      .userSignup(data.username, data.email, data.password)
      .then((res) => {
        if (res != undefined && typeof window !== 'undefined') {
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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      handleUpdateTheme(storedTheme, dispatch);
    }
  }, [dispatch]);

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
              <div className="max-w-md w-full p-6">
                <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                  Sign Up
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          id="username"
                          {...field}
                          className={`mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                            errors.username ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
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
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link href="/signIn" className="text-black hover:underline">
                      Login
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

export default SignUp;
