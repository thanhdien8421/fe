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
import { JobPostAndDescription, RecordApply } from "@/lib/interface";
import { useRouter } from "next/navigation";

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const RecruitmentedList = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [jobData, setJobData] = React.useState<RecordApply[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(10); // Số lượng bản ghi trên mỗi trang
  const [totalPosts, setTotalPosts] = React.useState<number>(0); // Tổng số bài đăng
  const [title, setTitle] = React.useState<string>("");

  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/records-post/${params.id}?page=${currentPage}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTitle(data.data.title);
      setJobData(data.data.result);
      setTotalPosts(data.data.totalPosts); // Giả sử API
    } catch (error) {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobData();
  }, [currentPage, pageSize]); // Chạy lại khi currentPage hoặc pageSize thay đổi

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

  const AddPostButton: React.FC = () => {
    return (
      <div className="flex items-center justify-center ">
        <Link href="/post">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200 ease-in-out shadow-md cursor-pointer">
            <IoMdAdd className="text-2xl" />
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center m-7">
      <h1 className="m-6 text-[1.5rem] text-center mb-[60px]">
        Danh sách record nộp vào bài tuyển dụng <br />
        <span
          className="text-blue-500"
          onClick={() => {
            router.push(`/recruitment/${jobData[0].recruitmentPostId}`);
          }}
        >
          {title}
        </span>
      </h1>

      <div className="flex flex-col gap-5 min-h-[500px]">
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-[5%] text-center">STT</TableHead>
              <TableHead className="w-[20%] text-center">Tên</TableHead>
              <TableHead className="w-[20%] text-center">Email</TableHead>
              <TableHead className="text-center">Số điện thoại</TableHead>
              <TableHead className="text-center">Xem chi tiết</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {jobData.map((item, index) => (
              <TableRow key={index} className="text-center">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.employerName}</TableCell>
                <TableCell>{item.employerEmail}</TableCell>
                <TableCell>{item.employerPhone}</TableCell>
                <TableCell>
                  <Button className="bg-sky-500">
                    <Link href={`/recruitment`}>Xem</Link>
                  </Button>
                </TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalPages > 1 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <Button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg text-white transition duration-200 ${
                        currentPage === 1
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      Trước
                    </Button>
                    <span className="text-lg font-semibold">
                      Trang {currentPage} / {totalPages}
                    </span>
                    <Button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg text-white transition duration-200 ${
                        currentPage === totalPages
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      Sau
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
};

export default RecruitmentedList;
