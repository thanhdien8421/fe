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
      console.log(data.data.totalPosts);
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
      <div className="loader h-screen flex flex-col items-center justify-center">
        <div className="spinner w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Đang tải...</p>
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
    return <div>{error}</div>;
  }

  const totalPages = Math.ceil(totalPosts / pageSize); // Tính tổng số trang
  const AddPostButton: React.FC = () => {
    return (
      <div className="flex items-center justify-center ">
        <Button
          onClick={() => {
            router.push(`/recruitment/manage/create`);
          }}
          className="bg-green-500 hover:bg-green-600 transition ease-in-out duration-300 "
        >
          Tạo Bài đăng mới
        </Button>
      </div>
    );
  };
  return (
    <div className="flex flex-col justify-center m-7">
      <h1 className="m-6 text-[1.5rem] text-center">
        Danh sách bài đăng của bạn
      </h1>

      <div className="flex space-x-4 mb-4">
        <Button
          className={`px-4 py-2 rounded-md font-bold ${
            status === "still"
              ? "bg-green-500 cursor-default hover:bg-green-500  "
              : "bg-gray-200 hover:bg-green-600 transition ease-in-out duration-300 text-black"
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
          className={`px-4 py-2 rounded-md font-bold ${
            status !== "still"
              ? "bg-amber-500 text-white cursor-default hover:bg-amber-500 "
              : " bg-gray-200 hover:bg-amber-600 transition ease-in-out duration-300 text-black"
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
      <div className="flex flex-col gap-5 min-h-[500px]">
        <div className="ml-auto pr-[15px]">
          <AddPostButton />
        </div>
        <Table className="border border-green-200 rounded-xl select-none ">
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-[5%] text-center">STT</TableHead>
              <TableHead className="w-[20%] text-center">Tên</TableHead>
              <TableHead className="w-[20%] text-center">Mô tả</TableHead>
              <TableHead className="text-center">Địa điểm</TableHead>

              {status === "still" && (
                <>
                  <TableHead className="text-center">Ngày tuyển dụng</TableHead>
                  <TableHead className="text-center">Ngày kết thúc</TableHead>
                </>
              )}
              <TableHead className="text-center">Xem bài đăng</TableHead>

              <TableHead className="text-center">Chỉnh sửa</TableHead>
              <TableHead className="text-center">Xem record apply</TableHead>
              <TableHead className="text-center">Đóng tuyển dụng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobData.map((post, index) => (
              <TableRow key={post.id} className="text-center">
                <TableCell>
                  {(currentPage - 1) * pageSize + index + 1}
                </TableCell>{" "}
                {/* Hiển thị số thứ tự */}
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="font-medium">
                  {post.description}
                </TableCell>
                <TableCell>{post.location}</TableCell>
                {status === "still" && (
                  <>
                    <TableCell>{formatDate(post.datePosted)}</TableCell>
                    <TableCell>{formatDate(post.deadline)}</TableCell>
                  </>
                )}
                <TableCell>
                  <Button className="bg-sky-500">
                    <Link href={`/recruitment/${post.id}`}>Xem</Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-gray-500 hover:bg-green-400"
                    onClick={() => {
                      router.push(`/recruitment/manage/update/${post.id}`);
                    }}
                  >
                    <FaRegEdit className="text-center h-full" />
                    Chỉnh sửa
                  </Button>
                </TableCell>
                <TableCell>
                  <Button className="bg-blue-500">
                    <Link href={`/recruitment/manage/recordApply/${post.id}`}>
                      Xem
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-amber-500 hover:bg-amber-600"
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  >
                    <CiLock />
                    Đóng
                  </Button>
                </TableCell>
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
