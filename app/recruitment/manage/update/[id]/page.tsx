"use client";
import React from "react";
import UpdatePost from "@/components/updatePost/updatepost";
import { RecruitmentPost } from "@/lib/interface";

export default function UpdateResuiment({
  params,
}: {
  params: { id: string };
}) {
  const [jobData, setJobData] = React.useState<RecruitmentPost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/recruitment-post/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobData(data.data[0]);
      } catch (error) {
        setError("Not found");
      }
    };

    fetchJobData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl m-auto shadow-lg rounded-lg p-8 w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8 ">
        </h2>
        {jobData ? (
          <UpdatePost initJob={jobData} />
        ) : (
          <p className="text-center text-gray-500">Không tìm thấy công việc...</p>
        )}
      </div>
    </div>
  );
}