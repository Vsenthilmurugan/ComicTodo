
'use client'
import MainViewCard from "../components/CarouselItems/MainViewCard";
import {useSelector } from "react-redux";
import Cards from "../components/CarouselItems/Cards";
import { DataTypes } from "../common/types";

export default function UserTodo() {

  const themeState:DataTypes.ThemeProps = useSelector((state:any) => state.theme);

  return (
    <div style={{background:themeState.theme_body}} className="h-screen lg:h-screen xl:h-[550px] pt-5">
      <MainViewCard />
      <Cards />
    </div>
  );
}
