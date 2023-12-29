"use client";
import MainViewCard from "../components/CarouselItems/MainViewCard";
import { useSelector } from "react-redux";
import Cards from "../components/CarouselItems/Cards";
import { DataTypes } from "../common/types";
import { Fragment, useEffect } from "react";
import { verifyToken } from "../common/utilities";
import { useRouter } from "next/navigation";
import Preloader from "../components/Loader/Preloader";

export default function UserTodo() {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const route = useRouter();
  const authData = verifyToken(localStorage.getItem("token")!, route);

  return (
    <div
      style={{ background: themeState.theme_body }}
      className="h-screen lg:h-screen xl:h-[550px] pt-5"
    >
      {authData ? (
        <Fragment>
          <MainViewCard />
          <Cards />
        </Fragment>
      ) : (
        <Preloader/>
      )}
    </div>
  );
}
