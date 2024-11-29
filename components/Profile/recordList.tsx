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

export default function RecordList({data} : {data : Data[]}) {
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
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/api/v1/records`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setData(data.data.result);
  //   } catch (error) {
  //     setError("Lỗi");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchData();
  // }, [currentPage]); // Chạy lại khi currentPage hoặc pageSize thay đổi

  return (
    <Card className="drop-shadow-sm h-[300px] pb-2 bg-gray-50">
      <CardHeader className="border-b-2 rounded-t-lg bg-[#DFF2EB]">
      <p className="text-lg font-semibold text-gray-800">Record</p>
      </CardHeader>
      <CardContent className="py-5 h-3/4 bg-gray-50">
        { (data.length == 0) ?
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
          <EditButton val={'/record'}/>
          <TrashButton val = {`records/${obj.id}`}/>
        </div>
        </div>
        )}
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