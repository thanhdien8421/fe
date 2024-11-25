"use client";
import DescriptionJobPage from "@/components/DescriptionJob/Description";

import { InfoJob } from "@/lib/data";
import React from "react";

export default function DescriptinPage({ params }: { params: { id: string } }) {
  const [jobData, setJobData] = React.useState(null);
  const [jobDescription, setJobDescription] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/recruitment-post/${params.id}`
        ); // Thay đổi URL theo API của bạn
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobData(data.data[0]);
      } catch (error) {
        setError("Not found");
      }
    };
    const fetchDesciptionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/job-description/${params.id}`
        ); // Thay đổi URL theo API của bạn
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobDescription(data.data[0]);
      } catch (error) {
        setError("Not found");
      }
    };
    fetchJobData();
    fetchDesciptionData();
    setLoading(false);
  }, []); // Chỉ chạy một lần khi component mount

  if (loading) {
    return (
      <div className="loader  h-screen flex flex-col items-center justify-center">
        <div className="spinner w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {jobData && jobDescription ? (
        <DescriptionJobPage job={jobData} jobDescription={jobDescription} />
      ) : (
        <p>Không tìm thấy công việc...</p>
      )}
    </div>
  );
}
