"use client";
import { Button } from "../ui/button";
import { UploadCVForm } from "../Form/UploadCVForm";
import { JobPost } from "@/lib/interface";
import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMapPin2Line } from "react-icons/ri";
import { TfiTime } from "react-icons/tfi";


interface ItemdescriptionProp {
  title: string;
  des: string[];
}
export function Itemdescription({ title, des }: ItemdescriptionProp) {

  return (
    <div className="mt-[30px]">
      <strong className="text-xl   ">{title}</strong>
      <ul className="list-disc pl-[20px] text-gray-600 mt-[10px]">
        {des.map((title: string) => <li >{title}</li>)}
      </ul>
    </div>
  );
};

export default function DescriptionJobPage({ job }:{job:JobPost}) {
  let Title = () => {
    return (
      <div className=" flex  justify-center  w-full h-[200px] ">
        <div className="w-[950px] bg-white rounded-[15px]  ">
          <div className="text-2xl font-semibold pt-[40px]  pl-[40px]  pr-[30px] pb-0">
            {job.title}
          </div>
          <div className="flex mt-3 text-lg h-[80px] justify-around">
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <GiTakeMyMoney size={30} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4">
                <div>Mức lương</div>
                <div>{job.salary} triệu</div>{" "}
              </div>
            </div>
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <RiMapPin2Line size={30} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4">
                <div>Địa điểm</div>
                <div>Thành phố {job.location}</div>{" "}
              </div>
            </div>
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <TfiTime size={27} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4  ">
                <div> Kinh nghiệm </div>
                <div> {job.exp}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };




  let Body = () => {
    return (
      <div className=" flex  justify-center  w-full mt-10 ">
        <div className="w-[950px] bg-white rounded-[15px] pt-[30px] pl-[40px] pr-[40px] pb-[30px]">
          <strong className="text-2xl  ">Chi tiết tin tuyển dụng</strong>
          <Itemdescription title={"Mô tả công việc"} des={job.titleCompany}></Itemdescription>
          <Itemdescription title={"Yêu cầu ứng viên"} des={job.request}></Itemdescription>
          <Itemdescription title={"Quyền lợi"} des={job.interest}></Itemdescription>
          <Itemdescription title={"Địa điểm làm việc"} des={job.locationDetail}></Itemdescription>
          <Itemdescription title={"Cách thức ứng tuyển"} des={["Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây."]}></Itemdescription>
          {/* <div className=" text-center mt-[20px] w-[150px] bg-[#00b14f] rounded-[7px] p-[7px] font-semibold text-white hover:bg-green-600 ">
            <DialogDemo />
          </div> */}
          <div className="flex gap-3 w-[950px] mt-10">
          <UploadCVForm title={job.title} id={job.id} />
          <Button variant={"secondary"}>Lưu tin</Button>
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