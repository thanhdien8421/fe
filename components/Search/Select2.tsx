import React, { useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setTag } from '@/hooks/slices/useTag';

const Select2 = () => {
    const provincesAndCities = [
        "",
        "Hà Nội",
        "Hải Phòng",
        "Đà Nẵng",
        "Hồ Chí Minh",
        "Cần Thơ",
        "Hải Dương",
        "Thái Bình",
        "Nam Định",
        "Ninh Bình",
        "Tuyên Quang",
        "Quảng Ninh",
        "Hà Giang",
        "Lào Cai",
        "Sơn La",
        "Điện Biên",
        "Yên Bái",
        "Hòa Bình",
        "Thanh Hóa",
        "Nghệ An",
        "Hà Tĩnh",
        "Quảng Bình",
        "Quảng Trị",
        "Thừa Thiên Huế",
        "Đắk Lắk",
        "Đắk Nông",
        "Gia Lai",
        "Kon Tum",
        "Khánh Hòa",
        "Ninh Thuận",
        "Bình Thuận",
        "Lâm Đồng",
        "Bình Dương",
        "Đồng Nai",
        "Bà Rịa - Vũng Tàu",
        "Tiền Giang",
        "Bến Tre",
        "Trà Vinh",
        "Vĩnh Long",
        "Đồng Tháp",
        "An Giang",
        "Kiên Giang",
        "Hậu Giang",
        "Sóc Trăng",
        "Bạc Liêu",
        "Cà Mau",
        "Long An",
        "Tây Ninh",
        "Bình Phước",
        "Quảng Nam",
        "Quảng Ngãi",
        "Phú Yên",
        "Thái Nguyên",
        "Lạng Sơn",
        "Cao Bằng",
        "Hà Nam",
        "Hưng Yên",
        "Bắc Ninh",
        "Bắc Giang",
        "Vĩnh Phúc"
    ];
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()
    return (
        <div className='flex-1 w-10 text-[14px] relative top-5 cursor-pointer border-gray-200'>
            <div onClick={() => setOpen(!open)} className='bg-white flex items-center justify-space'>
                <IoLocationOutline size={20} className='mt-3'/>
                <p className='mr-5 mt-3'>{selected ? selected : "Khu vực"}</p>
            </div>
            <ul className={` bg-white mt-2 absolute top-[45px] w-80 text-start rounded-[2px] overflow-y-auto drop-shadow-lg
                              ${open ? "max-h-60 " : "max-h-0"}`}>
                <div className='sticky top-0' key={0}>
                    <input type="text" placeholder='Nhập khu vực bạn muốn chọn' className='placeholder:text-gray-400 p-2 w-full outline-none'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                    />
                </div>
                {
                    provincesAndCities.map((area: string) => (
                        <li key={area} className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                            ${area?.toLowerCase().startsWith(inputValue)
                                ? "block"
                                : "hidden"
                            }`}
                            onClick={() => { setSelected(area); setOpen(false); dispatch(setTag(area)) }}
                        >{area === "" ? "Tất cả": area}</li>
                    ))
                }


            </ul>
        </div>
    )
}

export default Select2