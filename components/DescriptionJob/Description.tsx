"use client";
import { Button } from "../ui/button";
import { UploadCVForm } from "../Form/UploadCVForm";
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
      <strong className="text-xl">{title}</strong>
      <ul className="list-disc pl-[20px] text-gray-600 mt-[10px]">
        {des.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DescriptionJobPage({ job }: { job: any }) {
  const [rating, setRating] = useState<number>(0);
  const [save, setSave] = useState(false);

  // Lấy rating từ server
  const fetchRating = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");

      const response = await fetch(
        `http://localhost:8000/api/v1/evaluations/employee/${userId}/post/${job.id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRating(data.data.rating || 0); // Đặt mặc định là 0 nếu không có rating
      setSave(data.data.saved || false);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  const submitRating = async (newSave: boolean, newRating: number) => {
    try {
      let userId: any = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");
      userId = parseInt(userId, 10);

      const body = {
        rating: newRating,
        saved: newSave,
        employeeId: userId,
        recruitmentPostId: job.id,
      };

      const response = await fetch(`http://localhost:8000/api/v1/evaluations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRating(data.data.rating);
      setSave(data.data.saved);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const Title = () => (
    <div className="flex justify-center w-full h-[200px]">
      <div className="w-[950px] bg-white rounded-[15px]">
        <div className="text-2xl font-semibold pt-[40px] pl-[40px] pr-[30px] pb-0">
          {job.title}
        </div>
        <div className="flex mt-3 text-lg h-[80px] justify-around">
          {/* Render thông tin công việc */}
          {[
            {
              icon: <GiTakeMyMoney size={30} color="white" />,
              label: "Mức lương",
              value: job.salary || "Thỏa thuận",
            },
            {
              icon: <RiMapPin2Line size={30} color="white" />,
              label: "Địa điểm",
              value: `Thành phố ${job.location}`,
            },
            {
              icon: <TfiTime size={27} color="white" />,
              label: "Kinh nghiệm",
              value: job.experience || "Không yêu cầu",
            },
            {
              icon: <MdGroup size={27} color="white" />,
              label: "Số lượng",
              value: `${job.quantity} nhân viên`,
            },
          ].map((item, index) => (
            <div className="flex flex-row mt-3" key={index}>
              <div className="bg-green-500 rounded-[999px] w-[45px] h-[45px] flex justify-center items-center mt-2">
                {item.icon}
              </div>
              <div className="flex mt-1 flex-col ml-4">
                <div className="text-2xl font-semibold">{item.label}</div>
                <div>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Body = () => (
    <div className="flex justify-center w-full mt-10">
      <div className="w-[950px] bg-white rounded-[15px] p-[30px]">
        <strong className="text-2xl">Chi tiết tin tuyển dụng</strong>
        <Itemdescription title="Mô tả công việc" des={[job.description]} />
        <Itemdescription
          title="Yêu cầu ứng viên"
          des={[
            `Trình độ: ${job.level}`,
            `Giới tính: ${job.gender || "Không yêu cầu"}`,
            `Kinh nghiệm: ${job.experience}`,
          ]}
        />
        <Itemdescription
          title="Thời gian làm việc"
          des={[job.employmentType]}
        />
        <Itemdescription title="Địa điểm làm việc" des={[job.location]} />
        <Itemdescription
          title="Cách thức ứng tuyển"
          des={[
            "Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.",
          ]}
        />
        <div className="flex gap-3 mt-10">
          <UploadCVForm recruitmentPostId={`${job.id}`} title={job.title} />
          <Button
            variant="secondary"
            onClick={() => submitRating(!save, rating)}
          >
            {save ? "Đã lưu tin" : "Đăng ký nhận tin"}
          </Button>
        </div>
        <div className="text-center my-5">
          <h2 className="text-2xl font-semibold mb-4">Đánh giá của bạn:</h2>
          <div className="flex justify-center gap-4">
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => submitRating(save, value)}
                className={`w-12 h-12 text-xl text-white rounded-md transition duration-300 transform hover:scale-110 ${
                  rating === value
                    ? "bg-blue-500"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f4f5f5] flex justify-center pb-[80px]">
      <div className="w-[80%] mt-[50px]">
        <Title />
        <Body />
      </div>
    </div>
  );
}
