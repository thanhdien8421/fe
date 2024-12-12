"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} ngày ${date.getDate()} tháng ${
    date.getMonth() + 1
  } năm ${date.getFullYear()}`;
}

// Interface for form data
interface FormData {
  minRating: string;
  minApplications: string;
  industry: string;
}

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto mt-8 px-4 animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-4">
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-2"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RecruitmentedList = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [jobData, setJobData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    minRating: "",
    minApplications: "",
    industry: "",
  });

  // Fetch job data
  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/stats/company`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobData(data.data);
    } catch {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  // Fetch filtered job data
  const fetchJobDatafilter = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(formData.minRating && { minRating: formData.minRating }),
        ...(formData.minApplications && {
          minApplications: formData.minApplications,
        }),
        ...(formData.industry && { industry: formData.industry }),
      }).toString();

      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/stats/company?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobData(data.data);
    } catch {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobDatafilter();
  };

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
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-white py-16 ">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 animate-fade-in">
            Khám phá Công ty
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm và khám phá các công ty hàng đầu cùng đánh giá chi tiết
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-6xl mx-auto -mt-2 px-4 ">
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Min Rating Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Đánh giá tối thiểu
              </label>
              <input
                type="text"
                name="minRating"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.minRating}
                onChange={handleChange}
                placeholder="Nhập đánh giá tối thiểu"
              />
            </div>

            {/* Min Applications Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Số lượng ứng tuyển tối thiểu
              </label>
              <input
                type="text"
                name="minApplications"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.minApplications}
                onChange={handleChange}
                placeholder="Nhập số ứng tuyển tối thiểu"
              />
            </div>

            {/* Industry Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Ngành nghề
              </label>
              <input
                type="text"
                name="industry"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Nhập ngành nghề"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-medium"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Table */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">STT</TableHead>
                <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">Tên công ty</TableHead>
                <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">Ngành nghề</TableHead>
                <TableHead className="py-4 px-6 text-sm font-medium text-gray-600 text-center">Số ứng tuyển</TableHead>
                <TableHead className="py-4 px-6 text-sm font-medium text-gray-600 text-center">Đánh giá TB</TableHead>
                <TableHead className="py-4 px-6 text-sm font-medium text-gray-600 text-center">Tổng bài đăng</TableHead>
                <TableHead className="py-4 px-6 text-sm font-medium text-gray-600 text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobData.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="py-4 px-6">{index + 1}</TableCell>
                  <TableCell className="py-4 px-6 font-medium">{item.companyName}</TableCell>
                  <TableCell className="py-4 px-6">{item.industry}</TableCell>
                  <TableCell className="py-4 px-6 text-center">{item.totalApplications}</TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {item.averageRating}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">{item.totalPosts}</TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                      <Link href={`/company/${item.companyName}`} className="text-white">
                        Xem chi tiết
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentedList;