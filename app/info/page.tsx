// pages/index.tsx
import React from "react";
import JobList from "@/components/job_ed/JobList";
import ProfileControl from "@/components/job_ed/ProfileControll";

const Home: React.FC = () => {
  const jobs = [
    {
      logo: "/images/logo1.png",
      title: "Chuyên Viên Phân Tích Dữ Liệu QM - DATA",
      company: "Công ty TNHH BEST LOGISTICS TECHNOLOGY",
      date: "03-05-2024 23:57",
      status: "NTD đã xem hồ sơ (03-05-2024 23:57)",
      salary: "10 - 15 triệu",
      cvLink: "/path/to/cv1.pdf",
    },
    {
      logo: "/images/logo2.png",
      title: "Chuyên Viên Phân Tích Giải Pháp Logistics",
      company: "CÔNG TY CỔ PHẦN NINJA VAN VIỆT NAM",
      date: "03-05-2024 21:37",
      status: "Đã ứng tuyển (03-05-2024 21:37)",
      salary: "16 - 18 triệu",
      cvLink: "/path/to/cv2.pdf",
    },
    {
      logo: "/images/logo3.png",
      title: "Nhân Viên Dữ Liệu Dự Án",
      company: "Công ty Cổ phần TEN Group",
      date: "03-05-2024 21:37",
      status: "NTD đã xem hồ sơ (03-05-2024 21:37)",
      salary: "Trên 7 triệu",
      cvLink: "/path/to/cv3.pdf",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto w-[1000px]">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Việc làm đã ứng tuyển</h1>
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
};

export default Home;
