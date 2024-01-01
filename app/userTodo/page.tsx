"use client";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { DataTypes } from "../common/types";
import { handleUpdateTheme, verifyToken } from "../common/utilities";
const MainViewCard = dynamic(
  () => import("../components/CarouselItems/MainViewCard")
);
const Cards = dynamic(() => import("../components/CarouselItems/Cards"));
const Preloader = dynamic(() => import("../components/Loader/Preloader"));
const useRouter =
  typeof window !== "undefined"
    ? require("next/navigation").useRouter
    : () => {};

export default function UserTodo() {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const route = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const authData = verifyToken(token != undefined ? token : "", route);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        handleUpdateTheme(storedTheme, dispatch);
      }
    }
  }, [dispatch]);

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
        <Preloader />
      )}
    </div>
  );
}
