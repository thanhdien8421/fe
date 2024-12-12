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

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="loader h-screen flex flex-col items-center justify-center">
    <div className="spinner w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg">Đang tải...</p>
  </div>
);

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
    } catch (error) {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobData();
  }, []); 

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-800 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Danh sách các bài tuyển dụng
            <br />
            <span className="text-blue-600 mt-2 block">
              Công Ty {decodeURIComponent(params.companyName)}
            </span>
          </h1>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobData.map((job: JobPostAndDescription) => (
            <div 
              key={job.postId} 
              className="transform hover:-translate-y-1 transition-all duration-200"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {jobData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Hiện tại chưa có vị trí nào đang tuyển dụng
            </p>
          </div>
        )}
      </div>
    </div>
  );
}