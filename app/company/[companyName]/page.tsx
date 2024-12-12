"use client";

import JobCard from "@/components/Common/JobCard";
import SearchForm from "@/components/Search/SearchBar";
import SearchBar from "@/components/Search/SearchBar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";
import { selectTag } from "@/hooks/slices/useTag";
import { InfoJob } from "@/lib/data";
import { JobCardData, JobPostAndDescription } from "@/lib/interface";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
interface FormData {
  industry: string;
  minRating: number;
  startDate: string;
  endDate: string;
  levelType: string;
}
export default function JobPage({
  params,
}: {
  params: { companyName: string };
}) {
  const router = useRouter();
  const [jobData, setJobData] = React.useState<JobPostAndDescription[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/getByCompanyName/${params.companyName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log(data.data);
      setJobData(data.data);
      // console.log(data.data.totalPosts);
      // setTotalPosts(data.data.totalPosts); // Giả sử API trả về tổng số bài đăng
    } catch (error) {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobData();
  }, []); // Chạy
  if (loading) {
    return (
      <div className="loader h-screen flex flex-col items-center justify-center">
        <div className="spinner w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pb-10">
      <h1 className="mt-12 text-[1.5rem] text-center mb-[60px]">
        Danh sách các bài tuyển dụng <br />
        <span className="text-blue-500 font-semibold">
          Công Ty {decodeURIComponent(params.companyName)}
        </span>
      </h1>
      <div className="text-center mt-[30px] mx-[12%] gap-[50px]  grid grid-cols-3 z-0 relative">
        {jobData.map((job: JobPostAndDescription) => (
          <JobCard job={job} key={job.postId} />
        ))}
      </div>
    </div>
  );
}
