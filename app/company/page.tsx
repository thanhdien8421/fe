"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableFooter,
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
    <div className="flex flex-col justify-center m-2 ">
      <h1 className="m-8 text-[1.5rem] text-center mb-[40px]">
        Danh sách công ty <br />
      </h1>

      <div className="min-h-[650px]">
        <div className="bg-white shadow-lg rounded-lg pt-2 pb-[20px] border border-gray-200">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-around"
          >
            {/* Min Rating */}
            <div className="flex flex-col w-full sm:w-1/4">
              <label
                htmlFor="minRating"
                className="text-base font-medium text-gray-600 mb-1"
              >
                Min Rating:
              </label>
              <input
                type="text"
                id="minRating"
                name="minRating"
                className="p-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-2 focus:ring-blue-500"
                value={formData.minRating}
                onChange={handleChange}
                placeholder="Nhập đánh giá tối thiểu"
              />
            </div>

            {/* Min Applications */}
            <div className="flex flex-col w-full sm:w-1/4">
              <label
                htmlFor="minApplications"
                className="text-base font-medium text-gray-600 mb-1"
              >
                Min Applications:
              </label>
              <input
                type="text"
                id="minApplications"
                name="minApplications"
                className="p-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-2 focus:ring-blue-500"
                value={formData.minApplications}
                onChange={handleChange}
                placeholder="Nhập số ứng tuyển vào tối thiểu"
              />
            </div>

            {/* Industry */}
            <div className="flex flex-col w-full sm:w-1/4">
              <label
                htmlFor="industry"
                className="text-base font-medium text-gray-600 mb-1"
              >
                Industry:
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                className="p-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-2 focus:ring-blue-500"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Nhập ngành nghề"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center ">
              <button
                type="submit"
                className="mt-[20px] bg-blue-600 text-white text-base rounded-md px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Lọc
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="text-center text-base text-gray-600">
                <TableHead className="w-[5%]">STT</TableHead>
                <TableHead className="w-[15%]">Tên công ty</TableHead>
                <TableHead className="w-[15%]">Ngành nghề</TableHead>

                <TableHead className="w-[10%] text-center">
                  Số ứng tuyển vào
                </TableHead>
                <TableHead className="w-[10%] text-center">
                  Đánh giá trung bình
                </TableHead>
                <TableHead className="w-[10%] text-center">
                  Tổng bài đăng
                </TableHead>
                <TableHead className="w-[15%] text-center">
                  Xem các bài đăng
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobData.map((item, index) => (
                <TableRow
                  key={index}
                  className="text-center text-base text-gray-700"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="text-start">
                    {item.companyName}
                  </TableCell>
                  <TableCell className="text-start">{item.industry}</TableCell>
                  <TableCell className="text-center">
                    {item.totalApplications}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.averageRating}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.totalPosts}
                  </TableCell>

                  <TableCell className="text-start">
                    <Button className="bg-sky-500 text-white rounded-md px-4 py-2 hover:bg-sky-600 transition duration-200">
                      <Link href={`/company/${item.companyName}`}>Xem</Link>
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
