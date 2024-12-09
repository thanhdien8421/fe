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
import SwitchStatusBtn from "@/components/Switch/switchBtn";

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
      const response = await fetch(`http://localhost:8000/api/v1/employees`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.data);
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
  let onchange = async (id: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchJobData();
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  };
  return (
    <div className="flex flex-col justify-center m-2 ">
      <h1 className="m-8 text-[1.5rem] text-center mb-[40px]">
        Danh sách tài khoản Employee trong hệ thống
      </h1>

      <div className="min-h-[650px] mt-14">
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="text-center text-base text-gray-600">
                <TableHead className="w-[5%] text-center">STT</TableHead>
                <TableHead className="w-[15%] text-center">Email</TableHead>
                <TableHead className="w-[15%] text-center">Tên</TableHead>

                <TableHead className="w-[10%] text-center">
                  Số điện thoại
                </TableHead>
                <TableHead className="w-[15%] text-center">Địa chỉ</TableHead>
                <TableHead className="w-[10%] text-center">
                  Trạng thái
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
                  <TableCell className="text-center">{item.email}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.phone}</TableCell>
                  <TableCell className="text-center">{item.address}</TableCell>
                  {/* <TableCell className="text-center">{item.isBanned}</TableCell> */}
                  <TableCell className="">
                    <button
                      onClick={() => {
                        onchange(item.id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Xóa
                    </button>
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
