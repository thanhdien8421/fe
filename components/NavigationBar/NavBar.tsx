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
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b shadow-sm">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
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
                <button className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide text-sky-600 transition-all duration-300 ease-in-out border-2 border-sky-600 rounded-lg hover:bg-gradient-to-r hover:from-sky-600 hover:to-blue-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-sky-200 active:scale-95">
                  <span>Đăng nhập</span>
                </button>
              </Link>
              <Link href="/signup">
                <button className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide text-sky-600 transition-all duration-300 ease-in-out border-2 border-sky-600 rounded-lg hover:bg-gradient-to-r hover:from-sky-600 hover:to-blue-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-sky-200 active:scale-95">
                  <span>Đăng ký</span>
                </button>
              </Link>
            </div>
          ) : (
            // Authenticated Navigation
            <div className="flex items-center justify-between flex-1 ml-8">
              <div className="flex items-center space-x-6">
                {(role === "Admin"
                  ? AdminNavLink
                  : role === "Employee"
                  ? employeeNavLink
                  : employerNavLink
                ).map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="relative group"
                  >
                    <span className="text-gray-700 font-semibold tracking-wide hover:text-sky-600 transition-colors duration-200">
                      {link.title}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* Profile */}
                {role === "Employee" && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Link href="/profile" className="relative">
                        <Avatar className="h-8 w-8 ring-2 ring-white transition-transform hover:scale-105">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-sky-100 text-sky-800 font-medium">
                            Us
                          </AvatarFallback>
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
                      className="inline-flex items-center justify-center rounded-full w-8 h-8 transition-colors hover:bg-red-50 group"
                    >
                      <MdLogout className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
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
