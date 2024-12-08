"use client";
import React, { useEffect, useState } from "react";
import PartOfNavbar from "./PartOfNavbar";
import Link from "next/link";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { HoverCard } from "@radix-ui/react-hover-card";
import { HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("type") !== null) setIsLoggedIn(true);
  }, [
    typeof window !== "undefined" ? window.localStorage.getItem("type") : null,
  ]);
  return (
    <div className="bg-white drop-shadow-xl">
      <nav className="flex flex-row items-center justify-between ml-[20px] h-[100px] rounded-[10px] ">
        <div className="flex flex-row items-center justify-center ">
          <Link
            href="/"
            className=" justify-self-center col-start-1 mr-[5px] object-fit"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="w-1/2 h-auto justify-self-center"
            />
          </Link>
          <Link href={"/recruitment"}></Link>
        </div>
        {!isLoggedIn ? (
          <div className="flex space-x-4 m-7 text-[1rem]">
            <Link href={"/login"}>
              <button className="border border-sky-600 text-sky-600 px-4 py-2 rounded hover:bg-sky-600 hover:text-white transition duration-200">
                Đăng nhập
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition duration-200">
                Đăng ký
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4 m-7 text-[1rem]">
            <div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href={"/profile"} passHref>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>Us</AvatarFallback>
                    </Avatar>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="rounded w-30 text-xs" side="left">
                  Profile
                </HoverCardContent>
              </HoverCard>
            </div>
            <div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href={"/"} passHref>
                    <MdLogout
                      className="text-4xl text-gray-700"
                      onClick={() => {
                        localStorage.removeItem("type");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("phone");
                        router.push("/profile");
                      }}
                    />
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="rounded w-30 text-xs" side="left">
                  Đăng xuất
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
