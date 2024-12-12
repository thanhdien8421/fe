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
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { RecordApply } from "@/lib/interface";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
interface FormData {
  certificateName: string;
  schoolName: string;
  companyName: string;
}
const RecruitmentedList = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [jobData, setJobData] = useState<RecordApply[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("submissionDate");
  const [formData, setFormData] = useState<FormData>({
    certificateName: "",
    schoolName: "",
    companyName: "",
  });
  const sortApplications = (applications: RecordApply[], sortBy: string) => {
    return [...applications].sort((a, b) => {
      if (sortBy === "status") {
        const statusOrder: { [key: string]: number } = {
          "Đang chờ": 1,
          "Đã chấp nhận": 2,
          "Đã từ chối": 3,
        };
        return (
          (statusOrder[a.applicationStatus] || 0) -
          (statusOrder[b.applicationStatus] || 0)
        );
      } else if (sortBy === "submissionDate") {
        return (
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        );
      }
      return 0;
    });
  };
  const fetchJobData = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        // Dynamically include form data as query params
      });

      const response = await fetch(
        `http://localhost:8000/api/v1/records-post/${
          params.id
        }?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTitle(data.data.title);
      setJobData(sortApplications(data.data.result, "submissionDate"));

      setTotalPosts(data.data.totalPosts);
    } catch (error) {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData(); // Fetch data using the form filters
  }, [currentPage, pageSize]);
  console.log(jobData);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,

      [name]: value,
    }));
  };
  const handleShortBy = (e: any) => {
    // fetchJobData();
    if (e.target.value1 != sortBy) {
      setSortBy(e.target.value);
    }
  };

  const fetchJobDatafilter = async (formData: FormData) => {
    try {
      let queryParams = "";

      if (formData.certificateName) {
        queryParams += `certificateName=${formData.certificateName}&`;
      }
      if (formData.companyName) {
        queryParams += `companyName=${formData.companyName}&`;
      }
      if (formData.schoolName) {
        queryParams += `schoolName=${formData.schoolName}&`;
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/${
          params.id
        }/filter-records?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobData(sortApplications(data.data, sortBy));
    } catch (error) {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 when a new search is done
    fetchJobDatafilter(formData);
  };

  const handleDelete = async (value: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/records-post/record/${value}/post/${params.id}`,
        {
          method: "DELETE", // Phương thức DELETE
          headers: {
            "Content-Type": "application/json", // Đặt kiểu nội dung nếu cần
            // Bạn có thể thêm các header khác nếu cần, như Authorization
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status}`); // Kiểm tra lỗi
      }
      fetchJobData();
    } catch (error) {
      console.error("L��i xóa:", error);
    }
  };
  const formatDate = (dateString: string): string => {
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

  const totalPages = Math.ceil(totalPosts / pageSize); // Tính tổng số trang
  const sortItems = () => {
    // const sortedItems = [...items].sort((a, b) => {
    //     return isAscending ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    // });
    // setItems(sortedItems);
    // setIsAscending(!isAscending);
  };

  return (
    <div className="flex flex-col justify-center m-7">
      <h1 className="m-6 text-[1.5rem] text-center mb-[60px]">
        Danh sách record nộp vào bài tuyển dụng <br />
        <span
          className="text-blue-500"
          onClick={() => {
            router.push(`/recruitment/${jobData[0]?.recruitmentPostId}`);
          }}
        >
          {title}
        </span>
      </h1>

      <div className="  min-h-[500px]">
        {/* Khung lọc dữ liệu */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-around"
          >
            {/* Certificate Name */}
            <div className="flex flex-col w-full sm:w-1/4">
              <label
                htmlFor="certificateName"
                className="text-base font-medium text-gray-600 mb-1"
              >
                Certificate Name:
              </label>
              <input
                type="text"
                id="certificateName"
                name="certificateName"
                className="p-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-2 focus:ring-blue-500"
                value={formData.certificateName}
                onChange={handleChange}
                placeholder="Nhập tên chứng chỉ"
              />
            </div>

            {/* School Name */}
            <div className="flex flex-col w-full sm:w-1/6">
              <label
                htmlFor="schoolName"
                className="text-base font-medium text-gray-600 mb-1"
              >
                School Name:
              </label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                className="p-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-2 focus:ring-blue-500"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="Nhập tên trường"
              />
            </div>

            {/* Company Name */}
            <div className="flex flex-col w-full sm:w-1/6">
              <label
                htmlFor="companyName"
                className="text-base font-medium text-gray-600 mb-1"
              >
                Company Name:
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="p-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-2 focus:ring-blue-500"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Nhập tên công ty ứng viên từng làm"
              />
            </div>

            {/* Sort Options */}
            <div className="flex flex-col w-full sm:w-1/4">
              <label
                htmlFor="sortBy"
                className="text-base font-semibold text-gray-700 "
              >
                Sort By:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="p-3 border border-gray-300 rounded-md shadow-sm text-lg focus:ring-2 focus:ring-blue-500"
                onChange={handleShortBy}
              >
                <option value="submissionDate">Ngày nộp</option>
                <option value="status">Trạng thái</option>
              </select>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center items-center mt-[40px] sm:mt-0 sm:w-auto w-full ">
              <button
                type="submit"
                className="mt-[20px] bg-blue-600 text-white text-base rounded-md px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Lọc
              </button>
            </div>
          </form>
        </div>

        {/* Bảng dữ liệu */}
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="text-center text-base text-gray-600">
                <TableHead className="w-[5%]">STT</TableHead>
                <TableHead className="w-[15%]">Tên</TableHead>
                <TableHead className="w-[15%]">Email</TableHead>
                <TableHead className="w-[20%]">Thời gian nộp</TableHead>
                <TableHead className="w-[15%]">Xem chi tiết</TableHead>
                <TableCell
                  className="w-[20%] text-start cursor-pointer"
                  onClick={sortItems}
                >
                  <span className="mr-2 flex items-center font-semibold text-gray-800">
                    Trạng thái
                  </span>
                </TableCell>
                <TableHead className="w-[15%] text-center">Xóa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobData.map((item, index) => (
                <TableRow
                  key={index}
                  className="text-center text-base text-gray-700"
                >
                  <TableCell className="text-start">{index + 1}</TableCell>
                  <TableCell className="text-start">
                    {item.employeeName}
                  </TableCell>
                  <TableCell className="text-start">
                    {item.employeeEmail}
                  </TableCell>
                  <TableCell className="text-start">
                    {formatDate(item.appliedDate)}
                  </TableCell>

                  <TableCell className="text-start">
                    <Button
                      onClick={() => {
                        localStorage.setItem("postId", params.id);
                        router.push(`/record/${item.recordId}`);
                      }}
                      className="bg-sky-500 text-white rounded-md px-4 py-2 hover:bg-sky-600 transition duration-200"
                    >
                      Xem
                    </Button>
                  </TableCell>
                  <TableCell className="text-start">
                    {item.applicationStatus}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-amber-500 hover:bg-amber-600"
                      onClick={() => {
                        handleDelete(item.recordId);
                      }}
                    >
                      {/* <CiLock /> */}
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalPages > 1 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <div className="flex justify-center items-center space-x-4 mt-6">
                      <Button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`px-6 py-3 rounded-lg text-white transition duration-200 ${
                          currentPage === 1
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        Previous
                      </Button>
                      <span className="text-lg text-gray-600">
                        {currentPage}
                      </span>
                      <Button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`px-6 py-3 rounded-lg text-white transition duration-200 ${
                          currentPage === totalPages
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        Next
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentedList;
