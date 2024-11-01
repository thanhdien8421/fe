import { MenuItemType } from '@/lib/interface'
import { HoverCard } from '@radix-ui/react-hover-card'
import Link from 'next/link'
import React from 'react'
import { HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

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

const iconMap: any = {
    "FaMagnifyingGlass": <FaMagnifyingGlass className='text-sky-500' />,
    "GrPersonalComputer": <GrPersonalComputer className='text-sky-500' />,
    "FaAward": <FaAward className='text-sky-500' />,
    "LuBuilding2": <LuBuilding2 className='text-sky-500' />,
    "BsStars": <BsStars className='text-sky-500' />,
    "IoCreateOutline": <IoCreateOutline className='text-sky-500' />,
    "SlEnvolopeLetter": <SlEnvolopeLetter className='text-sky-500' />,
    "SiFrontendmentor": <SiFrontendmentor className='text-sky-500' />,
    "CgFileDocument": <CgFileDocument className='text-sky-500' />,
    "FaRegCompass": <FaRegCompass className='text-sky-500' />,
    "MdOutlineFindInPage": <MdOutlineFindInPage className='text-sky-500' />,
    "CiMoneyCheck1": <CiMoneyCheck1 className='text-sky-500' />,
    "MdOutlineFolderSpecial": <MdOutlineFolderSpecial className='text-sky-500' />,
    "GiHandBag": <GiHandBag className='text-sky-500' />,
    "PiWaveTriangleFill": <PiWaveTriangleFill className='text-sky-500' />
};



interface PartOfNavbarProps {
    links: MenuItemType[]
}
const PartOfNavbar: React.FC<PartOfNavbarProps> = ({ links }) => {
    return (
        <ul className='col-start-1 text-[1rem] flex items-center gap-6 md:text-[1rem]'>
            {links.map((link: MenuItemType) => {
                return (
                    <HoverCard key={link.id}>
                        <HoverCardTrigger href={link.url} className='m-[10px] ml-5 mr-5 bg-white w-auto h-[100%]
                                                                    text-center rounded-[5px]  hover:text-sky-500'>
                            {link.title}
                        </HoverCardTrigger>
                        <HoverCardContent className='w-auto translate-x-1/3'>
                            {link?.extention.map((a: any) => {
                                return (
                                    <Link href={"/"} className="flex items-center mt-3  border border-gray-300 rounded-md bg-gray-100 p-2 "
                                    key={a.urlIcon}>
                                        {iconMap[a.urlIcon]}
                                        <p className="text-gray-800 ml-8 mr-8 w-[330px] h-auto  hover:text-sky-500">
                                            {a.titleIcon}
                                        </p>
                                    </Link>
                                )
                            })}

                        </HoverCardContent>
                    </HoverCard>
                )
            })}
        </ul>
    )
}

export default PartOfNavbar