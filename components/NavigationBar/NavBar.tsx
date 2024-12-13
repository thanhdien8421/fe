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
      title: "Quản lý bài đăng",
      url: "/recruitment/manage",
    },
    {
      id: "list2",
      title: "Tạo bài đăng mới",
      url: "/recruitment/manage/create",
    },
  ];

  const AdminNavLink = [
    {
      id: "list1",
      title: "Ứng viên",
      url: "/admin",
    },
    {
      id: "list2",
      title: "Nhà tuyển dụng",
      url: "/admin/employers",
    },
    {
      id: "list3",
      title: "AuditLog",
      url: "/admin/auditLog",
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
    <div className="sticky top-0 flex items-center justify-between z-50 pr-10 pl-24 w-full bg-white/80 backdrop-blur-md border-b shadow-sm h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
  
          {role === "" ? (
            // Guest Navigation
            <div className="flex items-center gap-4">
              <Link href="/login">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-sky-600 text-sky-600 h-9 px-4 py-2 hover:bg-sky-600 hover:text-white">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/signup">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-sky-600 text-sky-600 h-9 px-4 py-2 hover:bg-sky-600 hover:text-white">
                  Đăng ký
                </button>
              </Link>
            </div>
          ) : (
            // Authenticated Navigation
            <div className="flex items-center justify-between flex-1 ml-8">
              <UserNavBar
                links={
                  role === "Admin"
                    ? AdminNavLink
                    : role === "Employee"
                    ? employeeNavLink
                    : employerNavLink
                }
              />
              
              <div className="flex items-center gap-4">
                {/* Profile */}
                {role === "Employee" && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link href="/profile" className="relative">
                      <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>Us</AvatarFallback>
                      </Avatar>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit p-2" side="bottom">
                    <span className="text-sm font-medium">Profile</span>
                  </HoverCardContent>
                </HoverCard>
                )}
                {/* Logout */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button
                      onClick={() => {
                        localStorage.removeItem("type");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("phone");
                        router.push("/");
                        setRole("");
                      }}
                      className="inline-flex items-center justify-center rounded-full w-8 h-8 transition-colors hover:bg-gray-100"
                    >
                      <MdLogout className="h-5 w-5 text-gray-600" />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit p-2" side="bottom">
                    <span className="text-sm font-medium">Đăng xuất</span>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          )}
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
