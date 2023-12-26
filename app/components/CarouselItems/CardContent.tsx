import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { DataTypes } from "@/app/common/types";
import CategorySelectionButton from "./CategorySelectionButton";
import { useSelector } from "react-redux";

const CardContent = (props: DataTypes.CardContentProps) => {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  return (
    <Fragment>
      {props.name == "add" && (
        <div className="max-w-sm rounded-xl cursor-pointer">
          <div className="flex justify-center items-center w-full">
            <Image
              key={themeState.theme_add}
              src={"/" + themeState.theme_add + ".gif"}
              alt={themeState.theme_add}
              height={100}
              width={100}
            />
          </div>
          <div className="px-10">
            <p className=" mb-2 font-comic text-center text-[16px]">{"Add"}</p>
            <CategorySelectionButton buttonText={""} buttonBgColor={themeState.button_bg} categoryName="add" />
          </div>
        </div>
      )}
      {props.name == "available" && (
        <div className="max-w-sm rounded-xl cursor-pointer">
          <div className="flex justify-center items-center w-full">
            <Image
              key={themeState.theme_available}
              src={"/" + themeState.theme_available + ".gif"}
              alt={themeState.theme_available}
              height={100}
              width={100}
            />
          </div>
          <div className="px-10">
            <p className=" mb-2 font-comic text-[16px]">{"Available List"}</p>
            <CategorySelectionButton buttonText={""} buttonBgColor={themeState.button_bg} categoryName="available" />
          </div>
        </div>
      )}
      {props.name == "generator" && (
        <div className="max-w-sm rounded-xl cursor-pointer">
          <div className="flex justify-center items-center w-full">
            <Image
              key={themeState.theme_generator}
              src={"/" + themeState.theme_generator + ".gif"}
              alt={themeState.theme_generator}
              height={100}
              width={100}
            />
          </div>
          <div className="px-10">
            <p className=" mb-2 font-comic text-[16px]">
              {"Today's Generator"}
            </p>
            <CategorySelectionButton buttonText={themeState.theme_generator_text} buttonBgColor={themeState.button_bg} categoryName="generator" />
          </div>
        </div>
      )}
      {props.name == "inprogress" && (
        <div className="max-w-sm rounded-xl cursor-pointer">
          <div className="flex justify-center items-center w-full">
            <Image
              key={themeState.theme_inprogress}
              src={"/" + themeState.theme_inprogress + ".gif"}
              alt={themeState.theme_inprogress}
              height={100}
              width={100}
            />
          </div>
          <div className="px-10">
            <p className=" mb-2 font-comic text-[16px]">{"In-Progress"}</p>
            <CategorySelectionButton buttonText={""} buttonBgColor={themeState.button_bg} categoryName="inprogress" />
          </div>
        </div>
      )}
      {props.name == "completed" && (
        <div className="max-w-sm rounded-xl cursor-pointer">
          <div className="flex justify-center items-center w-full">
            <Image
              key={themeState.theme_completed}
              src={"/" + themeState.theme_completed + ".gif"}
              alt={themeState.theme_completed}
              height={100}
              width={100}
            />
          </div>
          <div className="px-10">
            <p className=" mb-2 font-comic text-[16px]">{"Completed"}</p>
            <CategorySelectionButton buttonText={""} buttonBgColor={themeState.button_bg} categoryName="completed" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CardContent;
