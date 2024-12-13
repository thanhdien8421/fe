"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { JobPostAndDescription, RecruitmentPost } from "@/lib/interface";
import { useRouter } from "next/navigation";
import { CiLock } from "react-icons/ci";

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const RecruitmentedList = () => {
  const router = useRouter();
  const [jobData, setJobData] = React.useState<RecruitmentPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(10); // Số lượng bản ghi trên mỗi trang
  const [totalPosts, setTotalPosts] = React.useState<number>(0); // Tổng số bài đăng
  const [status, setStatus] = React.useState<string>("still");
  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post?page=${currentPage}&pageSize=${pageSize}&still=${status}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJobData(data.data.recruitmentPosts);
      setTotalPosts(data.data.totalPosts); // Giả sử API trả về tổng số bài đăng
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
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Đang tải...</p>
      </div>
    );
  }
  let handleDelete = async (id: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/${id}`,
        {
          method: "DELETE", // Xác định phương thức là DELETE
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchJobData();
    } catch (error) {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const totalPages = Math.ceil(totalPosts / pageSize); // Tính tổng số trang
  const AddPostButton: React.FC = () => {
    return (
      <div className="flex items-center justify-center">
        <Button
          onClick={() => {
            router.push(`/recruitment/manage/create`);
          }}
          className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 transition ease-in-out duration-300"
        >
          Tạo Bài đăng mới
        </Button>
      </div>
    );
  };
  // Trong trang manage
return (
  <div className="min-h-screen bg-gray-50 pb-12">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="mb-6 mt-10 text-3xl font-bold text-center text-gray-800">
        Danh sách bài đăng của bạn
      </h1>

      {/* Status and Add Post Buttons */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <Button
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              status === "still"
                ? "bg-green-600 text-white shadow-lg shadow-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white hover:shadow-lg hover:shadow-green-200"
            }`}
            onClick={() => {
              if (status !== "still") {
                setCurrentPage(1);
                setStatus("still");
              }
            }}
          >
            Đang mở
          </Button>
          <Button
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              status !== "still"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
                : "bg-gray-100 text-gray-700 hover:bg-amber-600 hover:text-white hover:shadow-lg hover:shadow-amber-200"
            }`}
            onClick={() => {
              if (status !== "nostill") {
                setCurrentPage(1);
                setStatus("nostill");
              }
            }}
          >
            Đã đóng
          </Button>
        </div>

        <Button
          onClick={() => router.push(`/recruitment/manage/create`)}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg shadow-blue-200"
        >
          Tạo bài đăng mới
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b">
              <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">STT</TableHead>
              <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">Tên</TableHead>
              <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">Mô tả</TableHead>
              <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">Địa điểm</TableHead>
              {status === "still" && (
                <>
                  <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">Ngày tuyển dụng</TableHead>
                  <TableHead className="py-4 px-6 text-sm font-medium text-gray-600">Ngày kết thúc</TableHead>
                </>
              )}
              <TableHead className="py-4 px-6 text-sm font-medium text-gray-600 text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobData.map((post, index) => (
              <TableRow key={post.id} className="border-b hover:bg-gray-50 transition-colors">
                <TableCell className="py-4 px-6">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                <TableCell className="py-4 px-6 font-medium">{post.title}</TableCell>
                <TableCell className="py-4 px-6">{post.description}</TableCell>
                <TableCell className="py-4 px-6">{post.location}</TableCell>
                {status === "still" && (
                  <>
                    <TableCell className="py-4 px-6">{formatDate(post.datePosted)}</TableCell>
                    <TableCell className="py-4 px-6">{formatDate(post.deadline)}</TableCell>
                  </>
                )}
                <TableCell className="py-4 px-6">
                  <div className="flex justify-center space-x-2">
                    <Button 
                      className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
                      onClick={() => router.push(`/recruitment/${post.id}`)}
                    >
                      Xem
                    </Button>
                    <Button
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                      onClick={() => router.push(`/recruitment/manage/update/${post.id}`)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      onClick={() => router.push(`/recruitment/manage/recordApply/${post.id}`)}
                    >
                      Xem hồ sơ
                    </Button>
                    <Button
                      className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                      onClick={() => handleDelete(post.id)}
                    >
                      Đóng
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 py-4 bg-gray-50 border-t">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-white transition duration-200 ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
              }`}
            >
              Trước
            </Button>
            <span className="text-sm font-medium text-gray-700">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-white transition duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
              }`}
            >
              Sau
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default RecruitmentedList;
