"use client";
import MainViewCard from "../components/CarouselItems/MainViewCard";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../components/CarouselItems/Cards";
import { DataTypes } from "../common/types";
import { Fragment, useEffect } from "react";
import { handleUpdateTheme, verifyToken } from "../common/utilities";
import { useRouter } from "next/navigation";
import Preloader from "../components/Loader/Preloader";

export default function UserTodo() {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const route = useRouter();
  const authData = verifyToken(localStorage.getItem("token")!, route);
  const dispatch = useDispatch();


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      handleUpdateTheme(storedTheme, dispatch);
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
        <Preloader/>
      )}
    </div>
  );
}
