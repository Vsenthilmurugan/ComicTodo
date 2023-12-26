"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CardContent from "./CardContent";
import { useSelector } from "react-redux";
import { DataTypes } from "@/app/common/types";
import Carroussel from "./Carroussel";
const Cards = () => {
  const themeStateData: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );

  const [themeState, setThemeState] =
    useState<DataTypes.ThemeProps>(themeStateData);

  useEffect(() => {
}, [themeStateData]);

setTimeout(() => {
    setThemeState(themeStateData);
  }, 500);

  let cardsData = [
    {
      key: uuidv4(),
      content: (
        <CardContent name="generator" key={uuidv4()}/>
        ),
      },
      {
        key: uuidv4(),
        content: (
          <CardContent name="add" key={uuidv4()}/>
          ),
        },
        {
          key: uuidv4(),
          content: (
        <CardContent name="available" key={uuidv4()}/>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <CardContent name="inprogress" key={uuidv4()}/>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <CardContent name="completed" key={uuidv4()}
        />
      ),
    },
  ];

  return (
    <Carroussel
      cards={cardsData}
      height="230px"
      width="90%"
      margin="0 auto"
      offset={2}
      showArrows={false}
    />
  );
};
export default Cards;
