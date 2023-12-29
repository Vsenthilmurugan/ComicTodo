'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { serverAPI } from "@/app/common/serverAPI";
import toast from "react-hot-toast";

const SignInButton = () => {

  const userlogin = () =>{
    serverAPI.userLogin('kumaran98@gmail.com','test').then((res)=>{
      if(res.status==200){
        toast.success(res.data.message);
        router.push("/userTodo");

      }
    })
  }
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          userlogin();
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
