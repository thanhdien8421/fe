"use client";
import { Button } from "../ui/button";
import { UploadCVForm } from "../Form/UploadCVForm";
import { JobPost, JobPostAndDescription } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMapPin2Line } from "react-icons/ri";
import { TfiTime } from "react-icons/tfi";
import { MdGroup } from "react-icons/md";
interface ItemdescriptionProp {
  title: string;
  des: string[];
}
export function Itemdescription({ title, des }: ItemdescriptionProp) {
  return (
    <div className="mt-[30px]">
      <strong className="text-xl   ">{title}</strong>
      <ul className="list-disc pl-[20px] text-gray-600 mt-[10px]">
        {des.map((title: string) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DescriptionJobPage({ job }: { job: any }) {
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
                <div className="text-2xl font-semibold ">Mức lương</div>
                <div>{job.salary} </div>{" "}
              </div>
            </div>
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <RiMapPin2Line size={30} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4">
                <div className="text-2xl font-semibold ">Địa điểm</div>
                <div>Thành phố {job.location}</div>{" "}
              </div>
            </div>
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <TfiTime size={27} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4  ">
                <div className="text-2xl font-semibold "> Kinh nghiệm </div>
                <div> {job.experience}</div>
              </div>
            </div>
            <div className="flex flex-row mt-3 justify-start   ">
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                <MdGroup size={27} color="white" />
              </div>
              <div className="flex mt-1 flex-col ml-4">
                <div className="text-2xl font-semibold">Số lượng</div>
                <div>{job.quantity} nhân viên</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const [rating, setRating] = useState(null);

  const submitRating = (value: any) => {
    setRating(value);
    alert(`Bạn đã đánh giá: ${value}`);
  };
  let Body = () => {
    return (
      <div className=" flex  justify-center  w-full mt-10 ">
        <div className="w-[950px] bg-white rounded-[15px] pt-[30px] pl-[40px] pr-[40px] pb-[30px]">
          <strong className="text-2xl  ">Chi tiết tin tuyển dụng</strong>
          <Itemdescription
            title={"Mô tả công việc"}
            des={[job.description]}
          ></Itemdescription>
          <Itemdescription
            title={"Yêu cầu ứng viên"}
            des={[
              `Trình độ: ${job.level}`,
              `Giới tính : ${job.gender}`,
              `Kinh nghiệm : ${job.experience}`,
            ]}
          ></Itemdescription>
          <Itemdescription
            title={"Thời gian làm việc"}
            des={[job.employmentType]}
          ></Itemdescription>
          <Itemdescription
            title={"Địa điểm làm việc"}
            des={[job.location]}
          ></Itemdescription>
          <Itemdescription
            title={"Cách thức ứng tuyển"}
            des={[
              "Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.",
            ]}
          ></Itemdescription>
          {/* <div className=" text-center mt-[20px] w-[150px] bg-[#00b14f] rounded-[7px] p-[7px] font-semibold text-white hover:bg-green-600 ">
            <DialogDemo />
          </div> */}
          <div className="flex gap-3 w-[950px] mt-10">
            <UploadCVForm recruitmentPostId={`${job.id}`} title={job.title} />
            <Button variant={"secondary"}>Lưu tin</Button>
          </div>
          <div className="text-center my-5">
            <h2 className="text-2xl font-semibold mb-4">Đánh giá của bạn:</h2>
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => submitRating(value)}
                  className="w-12 h-12 text-xl text-white bg-green-500 rounded-md transition duration-300 hover:bg-green-600 transform hover:scale-110"
                >
                  {value}
                </button>
              ))}
            </div>
            {rating !== null && (
              <p className="mt-4 text-lg text-gray-700">
                Bạn đã đánh giá: {rating}
              </p>
            )}
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
}
