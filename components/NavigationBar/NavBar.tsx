import React from 'react'
import PartOfNavbar from './PartOfNavbar'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
    const navLink = [
        {
            id: 'list1',
            title: 'Việc làm',
            url: '/job',
            extention: [
                {
                    urlIcon: "FaMagnifyingGlass",
                    titleIcon: "Tìm việc"
                },
                {
                    urlIcon: "GrPersonalComputer",
                    titleIcon: "Việc làm IT"
                },
                {
                    urlIcon: "FaAward",
                    titleIcon: "Việc làm Senior"
                },
                {
                    urlIcon: "LuBuilding2",
                    titleIcon: "Danh sách công ty"
                },
                {
                    urlIcon: "BsStars",
                    titleIcon: "Top công ty"
                },
            ],
        },
        {
            id: 'list2',
            title: 'Hồ sơ & CV',
            url: '/record',
            extention: [{
                urlIcon: "IoCreateOutline",
                titleIcon: "Tạo CV"
            },
            {
                urlIcon: "SlEnvolopeLetter",
                titleIcon: "Tạo Cover Letter"
            },
            {
                urlIcon: "SiFrontendmentor",
                titleIcon: "Dịch vụ tư vấn CV"
            },
            {
                urlIcon: "CgFileDocument",
                titleIcon: "Hướng dẫn viết CV theo ngành nghề"
            },
            {
                urlIcon: "BsStars",
                titleIcon: "Top CV Profile"
            },],
        },
        {
            id: 'list3',
            title: 'Công cụ',
            url: '/tool',
            extention: [{
                urlIcon: "FaMagnifyingGlass",
                titleIcon: "Tìm việc"
            },
            {
                urlIcon: "GrPersonalComputer",
                titleIcon: "Việc làm IT"
            },
            {
                urlIcon: "FaAward",
                titleIcon: "Việc làm Senior"
            },
            {
                urlIcon: "LuBuilding2",
                titleIcon: "Danh sách công ty"
            },
            {
                urlIcon: "BsStars",
                titleIcon: "Top công ty"
            },],
        },
        {
            id: 'list4',
            title: 'Cẩm nang nghề nghiệp',
            url: '/manual',
            extention: [{
                urlIcon: "FaRegCompass",
                titleIcon: "Định hướng nghề nghiệp"
            },
            {
                urlIcon: "MdOutlineFindInPage",
                titleIcon: "Bí kiếp tìm việc"
            },
            {
                urlIcon: "CiMoneyCheck1",
                titleIcon: "Chế độ lương thưởng"
            },
            {
                urlIcon: "MdOutlineFolderSpecial",
                titleIcon: "Kiến thức chuyên ngành"
            },
            {
                urlIcon: "GiHandBag",
                titleIcon: "Hành trang nghề nghiệp"
            },
            {
                urlIcon: "PiWaveTriangleFill",
                titleIcon: "Thị trường và xu hướng tuyển dụng"
            },],
        },
    ]
    return (
        <div className='bg-white drop-shadow-xl'>
            <nav className='flex flex-row items-center justify-between ml-[20px] h-[100px] rounded-[10px] '>
                <div className='flex flex-row items-center justify-center'>
                    <Link href="/" className=' justify-self-center col-start-1 mr-[5px] object-fit'>
                        <Image src="/images/logo.jpg" alt="Logo" width={1000} height={1000} className='w-1/2 h-auto justify-self-center'/>
                    </Link>
                    <PartOfNavbar links={navLink} />
                </div>
                <div className="flex space-x-4 m-7 text-[1rem]">
                    <button className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition duration-200">
                        <Link href={"/login"}>Đăng nhập</Link>
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
                        <Link href={"/signup"}>Đăng ký</Link>
                    </button>
                    <Link target="_blank" href={"/job"} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200">
                        Đăng tuyển & tìm hồ sơ
                    </Link>
                </div>
            </nav>

        </div>
    )
}

export default NavBar