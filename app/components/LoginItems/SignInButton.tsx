'use client';
import React from "react";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/userTodo");
        }}
        type="button"
        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInButton;
