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
export default function JobPage() {
  const [data, setData] = useState<JobCardData[]>([]);
  const [keyword, changeKeyword] = useState<string>("");
  const [filter, setFilter] = useState<any>(InfoJob);
  const tag = useAppSelector(selectTag);
  useEffect(() => {
    setFilter(() =>
      jobData.filter(
        (e: any) =>
          e.title.toLowerCase().includes(keyword) &&
          (e.location.includes(tag) || tag === "")
      )
    );
  }, [keyword, tag]);
  const handleSearch = async (formData: FormData) => {
    try {
      // API call
      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/trends/analyze?industry=${formData.industry}&minRating=${formData.minRating}&startDate=${formData.startDate}&endDate=${formData.endDate}&levelType=${formData.levelType}`
      );
      const data = await response.json();
      setJobData(data.data);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const router = useRouter();
  const [jobData, setJobData] = React.useState<JobPostAndDescription[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(10); // Số lượng bản ghi trên mỗi trang
  const [totalPosts, setTotalPosts] = React.useState<number>(0); // Tổng số bài đăng
  const [status, setStatus] = React.useState<string>("still");
  const fetchJobData = async () => {
    try {
      const now = new Date(); // Lấy thời gian hiện tại

      // Ngày đầu năm nay
      const startOfYear = new Date(now.getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0]; // 1/1 của năm nay

      // Ngày cuối năm sau
      const endOfNextYear = new Date(now.getFullYear() + 1, 11, 31)
        .toISOString()
        .split("T")[0]; // 31/12 của năm sau

      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/trends/analyze?minRating=1&startDate=${startOfYear}&endDate=${endOfNextYear}&levelType=Competition`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

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
  }, [currentPage, pageSize]); // Chạy lại khi currentPage hoặc pageSize thay đổi
  React.useEffect(() => {
    fetchJobData();
  }, [status]); // Chạy
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

  const totalPages = Math.ceil(totalPosts / pageSize); // Tính tổng số trang

  return (
    <div className="pb-10">
      <div className=" mx-[10%]  pt-[60px] z-50 relative">
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="text-center mt-[50px] mx-[250px] gap-[50px]  grid grid-cols-4 z-0 relative">
        {jobData.map((job: JobPostAndDescription) => (
          <JobCard job={job} key={job.postId} />
        ))}
      </div>
    </div>
  );
}
