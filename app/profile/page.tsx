"use client";
import { useSelector } from "react-redux";
import Cards from "../components/CarouselItems/Cards";
import { DataTypes } from "../common/types";
import Image from "next/image";
import ThemeSelectionButtons from "../components/FormItems/ThemeSelectionButtons";
import { useEffect } from "react";
import { verifyToken } from "../common/utilities";
import { useRouter } from "next/navigation";
import Preloader from "../components/Loader/Preloader";

export default function Profile() {
  const router = useRouter();
  const themeState: DataTypes.ThemeProps = useSelector(
    (state: any) => state.theme
  );
  const route = useRouter();
  const authData = verifyToken(localStorage.getItem("token")!, route);

  return (
    <div
      style={{ background: themeState.theme_body }}
      className="h-screen lg:h-screen xl:h-[550px] pt-2"
    >
      {authData ? (
        <div className="bg-white overflow-hidden shadow rounded-lg border flex-auto max-w-screen-md mx-auto mt-5">
          <div className="px-4 py-5 sm:px-6 text-center">
            <div className="w-full flex items-center justify-center rounded-full mb-3">
              <Image
                src={"/default_user.png"}
                alt="user"
                height={100}
                width={100}
              />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This is some information about the user.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-500 font-extrabold">
                  User Name:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  John Doe
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-extrabold text-gray-500">
                  Email address:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  johndoe@example.com
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-extrabold text-gray-500">
                  Password:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  (123) 456-7890
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-extrabold  text-gray-500">
                  Theme:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ThemeSelectionButtons />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div className="mt-52">
          <Preloader />
        </div>
      )}
    </div>
  );
}
