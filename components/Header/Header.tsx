'use client'
import React, { useEffect, useState } from 'react'
import SearchBar from '../Search/SearchBar';

const Header = () => {
    const texts = [
        "CV mới ",
        "Định hướng nghề nghiệp ",
        "Việc làm mới ",
        "Công ty phù hợp ",
        "Mức lương cao ",
        "Thông tin thị trường ",
    ]
    const [currentText, setCurrentText] = useState(texts[2]);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Bắt đầu hiệu ứng mờ
            setTimeout(() => {
                setCurrentText(prevText => {
                    const currentIndex = texts.indexOf(prevText);
                    const nextIndex = (currentIndex + 1) % texts.length;
                    return texts[nextIndex];
                });
                setFade(false); // Kết thúc hiệu ứng mờ
            }, 1000); // Thời gian mờ dần (1 giây)
        }, 4000); // Thay đổi nội dung sau mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp interval
    }, [texts]);
    return (

        <div className='flex flex-row items-center justify-center w-[100%] bg-custom h-[calc(100vh-60px)]'>
            <div className='m-6 flex flex-col w-[45%]'>
                <p className=' flex-1 text-[1.5rem] font-semibold text-white'>Công nghệ AI dự đoán, cá nhân hóa việc làm</p>
                <h2 className='flex-1 text-[30px] font-semibold  text-white '>
                    <span className={`transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'} text-green-500`}>{currentText}</span>
                    dành cho bạn</h2>

                <SearchBar />
                <img src="https://cdn-new.topcv.vn/unsafe/800x/https://static.topcv.vn/v4/image/welcome/section-header/banner.png" alt=""
                    className='flex-1 rounded-xl mr-2' />
            </div>
           
        </div>
    )
}

export default Header
