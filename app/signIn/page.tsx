import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignInButton from "../components/LoginItems/SignInButton";
import { serverAPI } from "../common/serverAPI";
import toast from "react-hot-toast";

const SignIn = () => {
  
  return (
    <div className="sm:h-96 lg:h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Left side (40% width on all screens) */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black rounded-l-2xl">
          <img
            src={"/loginlogo.png"}
            alt="logo"
            width={"100%"}
            height={"100%"}
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Right side (60% width on all screens) */}
        <div className="w-full lg:rounded-l-none rounded-l-2xl bg-comic-cover bg-contain lg:w-1/2 flex items-center justify-center rounded-r-2xl py-5 h-[544px]">
          {/* Your form or content goes here */}
          <div className="bg-white rounded-2xl">
            <div className="max-w-lg w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Sign In
              </h1>
              <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                <div className="w-full lg:w-2/2 mb-2 lg:mb-0">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                  >
                   <Image src={"/google.png"} alt="google" height={20} width={20}/>{" "}
                    Sign Up with Google{" "}
                  </button>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>or with email</p>
              </div>
              <form action="#" method="POST" className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <SignInButton/>
              </form>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link href="/signUp" className="text-black hover:underline">Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <form>{/* Your form fields go here */}</form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
