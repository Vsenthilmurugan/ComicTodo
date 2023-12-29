import { DataTypes } from "@/app/common/types";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StartIcon from "@mui/icons-material/Start";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AvailableList from "../FormItems/AvailableList";
import toast from "react-hot-toast";
import { serverAPI } from "@/app/common/serverAPI";
import Preloader from "../Loader/Preloader";
import { intialData } from "@/app/common/intialData";
import Image from "next/image";

const MainViewCard = () => {
  const [preloader, setShowPreloader] = useState(false);
  const [generatedTodo, setGeneratedTodo] = useState<DataTypes.todoProps>(
    intialData.todoItem
  );
  const categoryStateData: DataTypes.CategorySelection = useSelector(
    (state: any) => state.category
  );
  const themeStateData: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );

  const todoGenrator = () => {
    setShowPreloader(true);
    serverAPI
      .RandomTodo()
      .then((res) => {
        if (res != undefined) {
          setGeneratedTodo(res.data.data);
        }
      })
      .finally(() => {
        setShowPreloader(false);
      });
  };
  const todoStatusUpdate = () => {
    setShowPreloader(true);
    serverAPI
      .updateTodo("status", "inprogress", generatedTodo._id)
      .then((res) => {
        console.log(res);
        toast.success(res.data.data.message);
        setGeneratedTodo(intialData.todoItem);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  };
  return (
    <div className="bg-white flex items-center justify-center mx-4 sm:mx-8 md:mx-12 lg:mx-80 xl:mx-80 rounded-xl h-[350px] lg:h-[300px] xl:h-[300px]">
      {categoryStateData.categoryName == "welcome" && (
        <div className="text-center">
          <Image
            src={"/"+themeStateData.theme_welcome_banner}
            alt="welcome"
            height={250}
            width={250}
          />
        </div>
      )}
      {categoryStateData.categoryName == "generator" &&
        (!preloader ? (
          <div className="text-center">
            <TextField
              multiline
              contentEditable={false}
              disabled
              id="outlined-basic"
              label="ToDo Item"
              variant="outlined"
              value={
                generatedTodo
                  ? generatedTodo.description
                  : "Todo Item Will be Shown Here"
              }
            />
            <div className="mt-5 text-center flex flex-col md:flex-row items-center justify-center w-full">
              <Button
                className=" w-[155px]"
                style={{ background: themeStateData.button_bg }}
                variant="contained"
                endIcon={<StartIcon />}
                onClick={() => {
                  todoGenrator();
                }}
              >
                <p className="mt-1">generate</p>
              </Button>{" "}
              &nbsp;&nbsp;
              <Button
                disabled={generatedTodo._id != "" ? false : true}
                className=" w-[155px]"
                style={{ background: themeStateData.button_bg }}
                variant="contained"
                endIcon={<PlayArrowIcon />}
                onClick={() => {
                  todoStatusUpdate();
                }}
              >
                <p className="mt-1">start</p>
              </Button>
            </div>
          </div>
        ) : (
          <Preloader />
        ))}
      {categoryStateData.categoryName == "add" && (
        <div className="">
          <TextField
            fullWidth
            multiline
            id="outlined-basic"
            label="Add ToDo Item"
            variant="outlined"
          />
          <div className="mt-3 text-center w-full">
            <Button
              style={{ background: themeStateData.button_bg }}
              variant="contained"
              endIcon={<AddBoxIcon />}
              onClick={() => {
                toast.success("Todo Added Successfully");
              }}
            >
              <p className="mt-1">ADD</p>
            </Button>
          </div>
        </div>
      )}
      {categoryStateData.categoryName == "available" && (
        <div className="w-full">
          <AvailableList categoryName="available" />
        </div>
      )}
      {categoryStateData.categoryName == "inprogress" && (
        <div className="w-full">
          <AvailableList categoryName="inprogress" />
        </div>
      )}
      {categoryStateData.categoryName == "completed" && (
        <div className="w-full">
          <AvailableList categoryName="completed" />
        </div>
      )}
    </div>
  );
};

export default MainViewCard;
