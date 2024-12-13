"use client";

import JobCard from "@/components/Common/JobCard";
import { Button } from "@/components/ui/button";
import { JobPostAndDescription } from "@/lib/interface";
import { useRouter } from "next/navigation";
import React from "react";

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

  if (loading) return <LoadingSkeleton />;

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-16"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Cơ hội nghề nghiệp tại
            <span className="block mt-2 text-yellow-300">
              {decodeURIComponent(params.companyName)}
            </span>
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-2xl mx-auto">
            Khám phá các vị trí tuyển dụng hấp dẫn và phát triển sự nghiệp của bạn
          </p>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="container mx-auto px-4 py-12">
        {jobData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Hiện tại chưa có vị trí nào đang tuyển dụng
            </h3>
            <p className="text-gray-500">
              Vui lòng quay lại sau để xem các cơ hội mới
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Vị trí đang tuyển ({jobData.length})
                  </h2>
                  <div className="h-1 w-20 bg-blue-600 rounded-full mt-2"></div>
                </div>
                
                {/* Optional: Add filters or actions here */}
                <div className="flex gap-3">
                  {/* Add any action buttons if needed */}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {jobData.map((job: JobPostAndDescription) => (
                <div 
                  key={job.postId} 
                  className="transform hover:-translate-y-1 transition-all duration-200"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}