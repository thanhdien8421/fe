"use client";
import React, { useEffect, useState } from "react";
import { UserNavBar } from "./PartOfNavbar";
import Link from "next/link";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { HoverCard } from "@radix-ui/react-hover-card";
import { HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const employeeNavLink = [
    {
      id: "list1",
      title: "Tuyển dụng",
      url: "/recruitment",
    },
    {
      id: "list2",
      title: "Hồ sơ & CV",
      url: "/record",
    },

    {
      id: "list4",
      title: "Company",
      url: "/company",
    },
  ];

  const employerNavLink = [
    {
      id: "list1",
      title: "Tuyển dụng",
      url: "/recruitment",
    },
    {
      id: "list2",
      title: "Hồ sơ & CV",
      url: "/record",
    },
    {
      id: "list3",
      title: "Thông tin",
      url: "/info",
    },
    {
      id: "list4",
      title: "Company",
      url: "/company",
    },
  ];

  const AdminNavLink = [
    {
      id: "list1",
      title: "Công ty",
      url: "/company",
    },
    {
      id: "list2",
      title: "Danh sách bài đăng",
      url: "/recruitment",
    },
    {
      id: "list3",
      title: "Danh sách profile",
      url: "/profile",
    },
    {
      id: "list4",
      title: "Danh sách CV",
      url: "/record",
    },
  ];
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    console.log("Navv");
    if (localStorage.getItem("type") === "Admin") {
      setRole("Admin");
    } else if (localStorage.getItem("type") === "Employee") {
      setRole("Employee");
    } else if (localStorage.getItem("type") === "Employer") {
      setRole("Employer");
    }
  });

  return (
    <div className="bg-white drop-shadow-xl">
      <nav className="flex flex-row items-center justify-between ml-[20px] h-[100px] rounded-[10px] gap-0 ">
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
        {role === "" ? (
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
          <div className="w-full flex flex-row items-center justify-between ">
            <div>
              <UserNavBar
                links={
                  role === "Admin"
                    ? AdminNavLink
                    : role === "Employee"
                    ? employeeNavLink
                    : employerNavLink
                }
              />
            </div>
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
                  <HoverCardContent
                    className="rounded w-30 text-xs"
                    side="left"
                  >
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
                          //userRole = "";
                          router.push("/");
                          setRole("");
                        }}
                      />
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="rounded w-30 text-xs"
                    side="left"
                  >
                    Đăng xuất
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;

// const navLink = [
//   {
//     id: "list1",
//     title: "Tuyển dụng",
//     url: "/recruitment",
//     extention: [
//       {
//         urlIcon: "FaMagnifyingGlass",
//         titleIcon: "Tìm việc",
//       },
//       {
//         urlIcon: "GrPersonalComputer",
//         titleIcon: "Việc làm IT",
//       },
//       {
//         urlIcon: "FaAward",
//         titleIcon: "Việc làm Senior",
//       },
//       {
//         urlIcon: "LuBuilding2",
//         titleIcon: "Danh sách công ty",
//       },
//       {
//         urlIcon: "BsStars",
//         titleIcon: "Top công ty",
//       },
//     ],
//   },
//   {
//     id: "list2",
//     title: "Hồ sơ & CV",
//     url: "/record",
//     extention: [
//       {
//         urlIcon: "IoCreateOutline",
//         titleIcon: "Tạo CV",
//       },
//       {
//         urlIcon: "SlEnvolopeLetter",
//         titleIcon: "Tạo Cover Letter",
//       },
//       {
//         urlIcon: "SiFrontendmentor",
//         titleIcon: "Dịch vụ tư vấn CV",
//       },
//       {
//         urlIcon: "CgFileDocument",
//         titleIcon: "Hướng dẫn viết CV theo ngành nghề",
//       },
//       {
//         urlIcon: "BsStars",
//         titleIcon: "Top CV Profile",
//       },
//     ],
//   },
//   {
//     id: "list3",
//     title: "Thông tin",
//     url: "/info",
//     extention: [
//       {
//         urlIcon: "FaMagnifyingGlass",
//         titleIcon: "Tìm việc",
//       },
//       {
//         urlIcon: "GrPersonalComputer",
//         titleIcon: "Việc làm IT",
//       },
//       {
//         urlIcon: "FaAward",
//         titleIcon: "Việc làm Senior",
//       },
//       {
//         urlIcon: "LuBuilding2",
//         titleIcon: "Danh sách công ty",
//       },
//       {
//         urlIcon: "BsStars",
//         titleIcon: "Top công ty",
//       },
//     ],
//   },
//   {
//     id: "list4",
//     title: "Hướng dẫn",
//     url: "/manual",
//     extention: [
//       {
//         urlIcon: "FaRegCompass",
//         titleIcon: "Định hướng nghề nghiệp",
//       },
//       {
//         urlIcon: "MdOutlineFindInPage",
//         titleIcon: "Bí kiếp tìm việc",
//       },
//       {
//         urlIcon: "CiMoneyCheck1",
//         titleIcon: "Chế độ lương thưởng",
//       },
//       {
//         urlIcon: "MdOutlineFolderSpecial",
//         titleIcon: "Kiến thức chuyên ngành",
//       },
//       {
//         urlIcon: "GiHandBag",
//         titleIcon: "Hành trang nghề nghiệp",
//       },
//       {
//         urlIcon: "PiWaveTriangleFill",
//         titleIcon: "Thị trường và xu hướng tuyển dụng",
//       },
//     ],
//   },
// ];
