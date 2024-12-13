"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import EditButton from "../ui/edit";
import TrashButton from "../ui/trash";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

const ITEMS_PER_PAGE = 5;

export default function RecordList({ data }: { data: Data[] }) {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // Tính toán tổng số trang
  let totalPages = data?.length ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;
  
  // Lấy dữ liệu của trang hiện tại
  const currentData = data?.slice?.((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <Card className="drop-shadow-lg h-[700px] pb-2 bg-white rounded-xl border border-gray-200">
      <CardHeader className="flex flex-row border-b rounded-t-xl bg-gradient-to-r from-blue-500 to-green-600 py-4">
        <p className="text-xl font-semibold text-white">
          Danh sách hồ sơ
        </p>
        <Link href="/record">
          <Button className="ml-auto hover:scale-105 transition-transform duration-200 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 w-8 h-8">
            <div className="flex items-center justify-center w-5 h-5 rounded-full transition duration-200 ease-in-out cursor-pointer">
              <IoMdAdd className="text-4xl text-white hover:scale-110 transition-transform font-bold" />
            </div>
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="py-5 gap-1 h-3/4">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-gray-400 font-medium">
              Chưa có dữ liệu
            </h1>
          </div>
        ) : (
          <div className="flex flex-col overflow-y-auto gap-4 h-full pr-2">
            {currentData.map((obj) => (
              <div
                key={obj.recordId}
                className="flex flex-row w-full gap-4 p-4 bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200 group"
              >
                <div className="flex flex-row justify-between w-full">
                  <div className="grid grid-cols-4 gap-4 w-full">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {obj.recordTitle}
                    </h2>
                    <div className="text-sm text-gray-500">
                      <p className="flex items-center gap-2">
                        <span className="text-gray-400">Số lần thành công:</span>
                        <span className="font-medium">
                          {obj.processedApplications > 0 ? obj.successfulApplications : "Chưa nộp"}
                        </span>
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p className="flex items-center gap-2">
                        <span className="text-gray-400">Tỷ lệ thành công:</span>
                        <span className="font-medium">
                          {obj.processedApplications > 0 ? `${obj.successRate}%` : "Chưa nộp"}
                        </span>
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p className="flex items-center gap-2">
                        <span className="text-gray-400">Hiệu suất:</span>
                        <span className="font-medium">
                          {obj.processedApplications > 0 ? obj.performance : "Chưa nộp"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 ml-4">
                    <EditButton val={`/record/${obj.recordId}`} />
                    <TrashButton val={`records/${obj.recordId}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface Data {
  employeeId: number;
  employeeName: string;
  recordId: number;
  recordTitle: string;
  processedApplications: number;
  successfulApplications: number;
  successRate: number;
  performance: string;
}