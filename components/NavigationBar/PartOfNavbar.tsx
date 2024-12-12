import { MenuItemType } from "@/lib/interface";
import { HoverCard } from "@radix-ui/react-hover-card";
import Link from "next/link";
import React from "react";
import { HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrPersonalComputer } from "react-icons/gr";
import { FaAward } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";
import { SiFrontendmentor } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
import { FaRegCompass } from "react-icons/fa";
import { MdOutlineFindInPage } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineFolderSpecial } from "react-icons/md";
import { GiHandBag } from "react-icons/gi";
import { PiWaveTriangleFill } from "react-icons/pi";

// const iconMap: any = {
//     "FaMagnifyingGlass": <FaMagnifyingGlass className='text-sky-500' />,
//     "GrPersonalComputer": <GrPersonalComputer className='text-sky-500' />,
//     "FaAward": <FaAward className='text-sky-500' />,
//     "LuBuilding2": <LuBuilding2 className='text-sky-500' />,
//     "BsStars": <BsStars className='text-sky-500' />,
//     "IoCreateOutline": <IoCreateOutline className='text-sky-500' />,
//     "SlEnvolopeLetter": <SlEnvolopeLetter className='text-sky-500' />,
//     "SiFrontendmentor": <SiFrontendmentor className='text-sky-500' />,
//     "CgFileDocument": <CgFileDocument className='text-sky-500' />,
//     "FaRegCompass": <FaRegCompass className='text-sky-500' />,
//     "MdOutlineFindInPage": <MdOutlineFindInPage className='text-sky-500' />,
//     "CiMoneyCheck1": <CiMoneyCheck1 className='text-sky-500' />,
//     "MdOutlineFolderSpecial": <MdOutlineFolderSpecial className='text-sky-500' />,
//     "GiHandBag": <GiHandBag className='text-sky-500' />,
//     "PiWaveTriangleFill": <PiWaveTriangleFill className='text-sky-500' />
// };

interface PartOfNavbarProps {
  links: MenuItemType[];
}
export const UserNavBar: React.FC<PartOfNavbarProps> = ({ links }) => {
  return (
    <div className="flex items-center space-x-1">
      {links.map((link: MenuItemType) => (
        <Link
          key={link.id}
          href={link.url}
          className="relative group px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <span className="relative">
            {link.title}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </span>
        </Link>
      ))}
    </div>
  );
};
