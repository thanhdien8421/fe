"use client";
import SearchBar from "@/components/Search/SearchBar";
import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMapPin2Line } from "react-icons/ri";
import { TfiTime } from "react-icons/tfi";

const DesriptionJobPage = () => {
  let Title = () => {
    return (
      <div className=" flex  justify-center  w-full h-[200px] ">
        <div className="w-[950px] bg-white rounded-[15px]  ">
          <div className="text-2xl font-semibold pt-[40px]  pl-[40px]  pr-[30px] pb-0">
            Tuyển dụng nhân viên fullstack
          </div>
          <div className="flex mt-3 text-lg h-[80px] justify-around">
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <GiTakeMyMoney size={30} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4">
                <div>Mức lương</div>
                <div>15-20</div>{" "}
              </div>
            </div>
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <RiMapPin2Line size={30} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4">
                <div>Địa điểm</div>
                <div>Thanh phố hồ chí minh</div>{" "}
              </div>
            </div>
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <TfiTime size={27} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4  ">
                <div> Kinh Nghiệm </div>
                <div> Tối thiểu 1 năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let Itemdescription = () => {
    return (
      <div className="mt-[30px]">
        <strong className="text-xl  ">Yêu cầu nhân viên</strong>
        <ul className="list-disc pl-[20px] mt-[10px]">
          <li>Có kinh nghiệm trong lĩnh vực fullstack hoặc ứng dụng web</li>
          <li>
            Có thể code chuyên nghiệp và thực hiện các yêu cầu với độ chính xác
            và đúng đắn giá
          </li>
          <li>
            Có thể sử dụng các ngôn ngữ lập trình và framework phù hợp như
            React, Angular, Vue.js
          </li>
          <li>Có thể sử dụng các hệ quản trị cơ s</li>
        </ul>
      </div>
    );
  };
  let Body = () => {
    return (
      <div className=" flex  justify-center  w-full mt-10 ">
        <div className="w-[950px] bg-white rounded-[15px] pt-[30px] pl-[40px] pr-[40px] pb-[30px]">
          <strong className="text-2xl  ">Chi tiết tin tuyển dụng</strong>
          <Itemdescription></Itemdescription>
          <Itemdescription></Itemdescription>
          <Itemdescription></Itemdescription>
          <Itemdescription></Itemdescription>
          <Itemdescription></Itemdescription>
          <div className="mt-[20px] ">
            <button className="bg-[#00b14f] rounded-[7px] p-[7px] font-semibold text-white hover:bg-green-600">
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-[#f4f5f5]  flex justify-center pb-[80px]">
      <div className="w-[80%] mt-[50px]">
        <Title></Title>

        <Body></Body>
      </div>
    </div>
  );
};

export default DesriptionJobPage;