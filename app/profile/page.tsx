"use client";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../components/CarouselItems/Cards";
import { DataTypes } from "../common/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { handleUpdateTheme, verifyToken } from "../common/utilities";
import { useRouter } from "next/navigation";
import Preloader from "../components/Loader/Preloader";
import { EditNoteOutlined, EditOutlined } from "@mui/icons-material";
import { intialData } from "../common/intialData";
import { serverAPI } from "../common/serverAPI";
import ProfileDialog from "../components/FormItems/ProfileDialog";

const Profile = () => {
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const route = typeof window !== "undefined" ? useRouter() : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [preloader, setShowPreloader] = useState(false);
  const authData = verifyToken(token != undefined ? token : "", route);
  const [userDetails, setUserDetails] = useState<DataTypes.userProps>(
    intialData.userContent
  );
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const dispatch = useDispatch();

  const userDetail = () => {
    setShowPreloader(true);
    serverAPI
      .getUser()
      .then((res) => {
        if (res != undefined && typeof window !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          setUserDetails(res.data.data);
        }
      })
      .finally(() => {
        setShowPreloader(false);
      });
  };
  useEffect(() => {
    userDetail();
  }, [confirmDialog]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      handleUpdateTheme(storedTheme, dispatch);
    }
  }, [dispatch]);
  return (
    <div
      style={{ background: themeState.theme_body }}
      className="h-screen lg:h-screen xl:h-[550px] pt-2"
    >
      {authData || !preloader ? (
        <div className="bg-white overflow-hidden shadow rounded-lg border flex-auto max-w-screen-md mx-auto mt-5">
          <div className="px-4 py-5 sm:px-6 text-center">
            <div className="w-full flex items-center justify-center rounded-full mb-3 border-gray-500">
              <Image
                src={
                  userDetails.image ? userDetails.image : "/default_user.png"
                }
                alt="S"
                height={100}
                width={100}
              />
            </div>
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              title="Edit Profile"
            >
              User Profile &nbsp;
              <span
                className="cursor-pointer"
                onClick={() => {
                  setConfirmDialog(true);
                }}
              >
                <EditNoteOutlined />
              </span>
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-500 font-extrabold">
                  User Name:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userDetails.name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-extrabold text-gray-500">
                  Email address:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userDetails.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-extrabold text-gray-500">
                  Password:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ********
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-extrabold  text-gray-500">
                  Theme:
                </dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userDetails.theme}
                </div>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div className="mt-52">
          <Preloader />
        </div>
      )}
      <ProfileDialog
        open={confirmDialog}
        close={() => {
          setConfirmDialog(false);
        }}
        userData={userDetails}
      />
    </div>
  );
};

export default Profile;
