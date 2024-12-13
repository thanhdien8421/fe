"use client";
import { Button } from "../ui/button";
import { UploadCVForm } from "../Form/UploadCVForm";
import React, { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMapPin2Line } from "react-icons/ri";
import { TfiTime } from "react-icons/tfi";
import { MdGroup } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

interface ItemdescriptionProp {
  title: string;
  des: string[];
}

export function Itemdescription({ title, des }: ItemdescriptionProp) {
  return (
    <div className="mt-8 border-b border-gray-100 pb-6 last:border-0">
      <strong className="text-xl text-gray-800 block mb-4">{title}</strong>
      <ul className="list-disc pl-6 space-y-2">
        {des.map((title) => (
          <li key={title} className="text-gray-600 leading-relaxed">
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DescriptionJobPage({ job }: { job: any }) {
  console.log(job);
  const [rating, setRating] = useState<number>(0);
  const [save, setSave] = useState(false);
  let type = localStorage.getItem("type") ?? "Employee";

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

      setRating(data.data.rating || 0);
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
    <div className="flex justify-center w-full min-h-[220px]">
      <div className="w-[950px] bg-white rounded-xl shadow-sm">
        <div className="text-2xl font-semibold px-8 pt-8 text-gray-800">
          {job.title}
        </div>
        <div className="flex flex-wrap gap-8 px-8 py-6">
          {[
            {
              icon: <GiTakeMyMoney size={24} color="white" />,
              label: "Mức lương",
              value: "Up to " + job.salary + " USD" || "Thỏa thuận $",
            },
            {
              icon: <RiMapPin2Line size={24} color="white" />,
              label: "Địa điểm",
              value: `Thành phố ${job.location}`,
            },
            {
              icon: <TfiTime size={24} color="white" />,
              label: "Kinh nghiệm",
              value: job.experience || "Không yêu cầu",
            },
            {
              icon: <MdGroup size={24} color="white" />,
              label: "Số lượng",
              value: `${job.quantity} nhân viên`,
            },
          ].map((item, index) => (
            <div className="flex items-center" key={index}>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full w-12 h-12 flex justify-center items-center shadow-sm">
                {item.icon}
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="font-medium text-gray-800">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const Body = () => (
    <div className="flex justify-center w-full mt-6">
      <div className="w-[950px] bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Chi tiết tin tuyển dụng
        </h2>

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
          title="Ngày đăng:"
          des={[formatDate(job.datePosted)]}
        />
        <Itemdescription
          title="Hạn nộp hồ sơ:"
          des={[formatDate(job.deadline)]}
        />
        <Itemdescription
          title="Cách thức ứng tuyển"
          des={[
            "Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.",
          ]}
        />

        {type == "Employee" && (
          <>
            <div className="flex gap-4 mt-8 border-t pt-8">
              <UploadCVForm recruitmentPostId={`${job.id}`} title={job.title} />
              <Button
                variant="outline"
                onClick={() => submitRating(!save, rating)}
                className="hover:bg-gray-50"
              >
                {save ? "Đã lưu tin" : "Lưu tin"}
              </Button>
            </div>
            <div className="text-center mt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Đánh giá của bạn
              </h2>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => submitRating(save, value)}
                    className="text-2xl transition-all duration-200"
                  >
                    <FaStar
                      className={`${
                        rating >= value ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-400 cursor-pointer`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-gray-600">({rating}/5)</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className=" pb-20 bg-custom">
      <div className="w-full max-w-7xl mx-auto pt-8">
        <Title />
        <Body />
      </div>
    </div>
  );
}
