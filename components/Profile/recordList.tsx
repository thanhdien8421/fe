"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import EditButton from "../ui/edit";
import TrashButton from "../ui/trash";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

// Số lượng bản ghi trên mỗi trang
const ITEMS_PER_PAGE = 5;

export default function RecordList({ data }: { data: Data[] }) {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // Tính toán tổng số trang
  let totalPages;
  if (data?.length) {
    totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  } else totalPages = 0;
  // Lấy dữ liệu của trang hiện tại
  let currentData;
  if (data?.slice) {
    currentData = data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  } else
    currentData = data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(data);
  return (
    <Card className="drop-shadow-sm h-[700px] pb-2 bg-gray-50 relative z-0">
      <CardHeader className="flex flex-row border-b-2 rounded-t-lg bg-green-200 justify-between">
        <div className="text-xl font-semibold text-gray-80 align-text-top">
          Danh sách hồ sơ
        </div>
        <Link href="/record">
          <Button className="ml-auto pr-[15px] bg-transparent hover:bg-yellow-200 border-2 border-yellow-400 flex flex-col item-start w-8 h-8">
            <div className="flex items-center justify-center w-5 h-5 rounded-full transition duration-200 ease-in-out cursor-pointer">
              <IoMdAdd className="text-4xl text-yellow-400 text-bold" />
            </div>
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="py-5 gap-1 h-3/4">
        {data.length === 0 ? (
          <h1 className="w-full h-full text-center p-20 text-gray-500">
            Chưa có dữ liệu
          </h1>
        ) : (
          <div className="flex flex-col overflow-y-auto gap-4 h-full">
            {currentData.map((obj) => {
              return (
                <div
                  className="flex flex-row justify-between w-full bg-gradient-to-b p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  key={obj.recordId}
                >
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">{obj.recordTitle}</h2>

                    <p>
                      <strong className="mr-2">Số hồ sơ thành công:</strong>{" "}
                      {obj.processedApplications > 0
                        ? obj.successfulApplications
                        : " Chưa nộp"}
                    </p>

                    <p>
                      <strong className="mr-2">Tỷ lệ thành công:</strong>
                      {obj.processedApplications > 0
                        ? `${obj.successRate} %`
                        : "   Chưa nộp"}
                    </p>

                    <p>
                      <strong className="mr-2">Hiệu suất:</strong>
                      {obj.processedApplications > 0
                        ? `${obj.performance} `
                        : "   Chưa nộp"}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <EditButton val={`/record/${obj.recordId}`} />
                    <TrashButton val={`records/${obj.recordId}`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface Data {
  employeeId: number; // ID của nhân viên
  employeeName: string; // Tên của nhân viên
  recordId: number; // ID của hồ sơ công việc
  recordTitle: string; // Tiêu đề của hồ sơ công việc
  processedApplications: number; // Số lượng hồ sơ ứng tuyển đã được xử lý
  successfulApplications: number; // Số lượng hồ sơ ứng tuyển thành công
  successRate: number; // Tỷ lệ thành công
  performance: string; // Đánh giá hiệu suất công việc
}
