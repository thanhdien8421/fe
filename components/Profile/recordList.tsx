"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Button } from "../ui/button";
import EditButton from "../ui/edit";
import TrashButton from "../ui/trash";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

export default function RecordList({ data}: { data: Data[] }) {
  const ed = [
    {
      id: 1,
      title: "Nộp Vinamilk",
      description: "ssccs",
      CV: "file link",
      experience: "[link kinh nghiệm]",
      education: "[link education]",
      certificate: "[link chứng chỉ]"
    },
    {
      id: 2,
      title: "Nộp Vinamilk",
      description: "ssccs",
      CV: "file link",
      experience: "[link kinh nghiệm]",
      education: "[link education]",
      certificate: "[link chứng chỉ]"
    },
    {
      id: 3,
      title: "Nộp Vinamilk",
      description: "ssccs",
      CV: "file link",
      experience: "[link kinh nghiệm]",
      education: "[link education]",
      certificate: "[link chứng chỉ]"
    },
  ];

  // const [data, setData] = React.useState<Data[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  
  return (
    <Card className="drop-shadow-sm h-[300px] pb-2  bg-gray-50 relative z-0">
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
        {(data.length == 0) ?
          <h1 className="w-full h-full text-center p-20 text-gray-500">
            Chưa có dữ liệu
          </h1>
          :
          <div className="flex flex-col overflow-y-auto gap-4 h-full">
            {data.map((obj) => {
              return (
                <div className="flex flex-row justify-between w-full bg-gradient-to-b p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  key={obj.id}>
                  <div>
                    <h2 className="text-xl font-semibold">{obj.title}</h2>
                    <p>Nội dung: {obj.description}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <EditButton val={'/record'} />
                    <TrashButton val={`records/${obj.id}`} />
                  </div>
                </div>
              )
            }
            )}
          </div>
        }
      </CardContent>
    </Card>
  );
}

interface Data {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  fileCvId: number
}