import { DataTypes } from "@/app/common/types";
import React from "react";
import { useSelector } from "react-redux";

const Preloader = () => {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const bg = "border-bg-" + themeState.theme_name;
  return (
    <div className="flex justify-center items-center">
      <div
        className={`text-center border-t-4 ${bg} border-solid rounded-full h-16 w-16 animate-spin`}
      ></div>
    </div>
  );
};

export default Preloader;
