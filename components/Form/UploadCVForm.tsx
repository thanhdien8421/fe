"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoCloseOutline } from "react-icons/io5";
import { MdDriveFileMove } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CgDanger } from "react-icons/cg";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

interface UploadCVFormProps {
  recruitmentPostId: string;
  title: string;
}

const Section = ({
  title,
  description,
  Icon,
  children,
}: {
  title: string;
  description?: string;
  Icon: React.ElementType;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Icon className="text-cyan-600" size={24} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-gray-500 text-sm">{description}</p>
      {children}
    </div>
  );
};

export function UploadCVForm({ recruitmentPostId, title }: UploadCVFormProps) {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState<boolean>(true);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [records, setRecords] = useState<any[]>([]);
  const fetchRecords = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/records/getRecordByOwn/${localStorage.getItem(
        "userId"
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setRecords(data.data);
  };
  useEffect(() => {
    fetchRecords();
  }, []);

  let onSubmit = async () => {
    if (chosenIndex !== null) {
      // Logic to handle the submission with the selected record
      console.log(`Submitting CV with ID: ${records[chosenIndex].recordId}`);
      const body = {
        recordId: records[chosenIndex].recordId,
        recruitmentPostId: parseInt(recruitmentPostId, 10),
        job: title,
      };
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/records-post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        setHidden(true);
      } catch (error) {
        console.error("Error submitting application:", error);
        setHidden(true);
      }
    } else {
      console.error("No CV selected");
    }
  };

  return (
    <div>
      <Toaster />
      <button
        className="bg-[#00b14f] rounded-[7px] p-[7px] font-semibold text-white hover:bg-green-600"
        onClick={() => setHidden(false)}
        disabled={isPending}
      >
        Ứng tuyển ngay
      </button>
      {!hidden && (
        <div className="bg-gray-500 fixed w-screen h-screen bg-opacity-25 top-0 left-0 flex justify-center items-center">
          <Card className="w-full md:max-w-[40rem] mx-3">
            <CardHeader className="flex justify-between items-center border-b-[1px] flex-row shadow-sm">
              <h3 className="text-xl font-bold">
                Ứng tuyển cho {recruitmentPostId}
              </h3>
              <Button
                onClick={() => setHidden(true)}
                className="w-[50px] rounded-full h-[50px] bg-gray-100 hover:bg-gray-300"
                type="button"
                disabled={isPending}
              >
                <IoCloseOutline color="black" />
              </Button>
            </CardHeader>
            <CardContent className="overflow-y-scroll h-[350px] px-7 py-5 flex flex-col gap-5">
              <Section title="Chọn CV để ứng tuyển" Icon={MdDriveFileMove}>
                {records.length === 0 ? (
                  <div className="flex flex-row gap-1 w-full p-6 rounded-lg shadow text-gray-500 bg-white border border-gray-200 hover:bg-gray-100">
                    <p>Bạn chưa có CV nào, tạo CV mới ngay</p>
                    <Link href="/record" className="underline text-blue-800">
                      Tại đây
                    </Link>
                  </div>
                ) : (
                  <>
                    <p>Chọn CV bạn muốn ứng tuyển</p>
                    <div>
                      {records.map((item, index) => (
                        <button
                          onClick={() => setChosenIndex(index)}
                          className={`w-full p-6 rounded-lg shadow ${
                            chosenIndex === index
                              ? "bg-[#09c522] border border-[#09c522] hover:bg-[#08b51f]"
                              : "bg-white border border-gray-200 hover:bg-gray-100"
                          }`}
                          key={item.recordId}
                        >
                          <h2 className="text-xl font-semibold">
                            {item.recordTitle}
                          </h2>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </Section>
              <Section title="Lưu ý" Icon={SlEnvolopeLetter}>
                <div className="border-[1px] min-h-[200px] p-3">
                  <div className="text-red-500 font-semibold flex gap-2 items-center">
                    <CgDanger />
                    <p>Lưu ý:</p>
                  </div>
                  <ol className="mt-3">
                    <li>
                      1. Chúng tôi khuyên tất cả các bạn hãy luôn cẩn trọng
                      trong quá trình tìm việc và chủ động nghiên cứu về thông
                      tin công ty, vị trí việc làm trước khi ứng tuyển. Ứng viên
                      cần có trách nhiệm với hành vi ứng tuyển của mình. Nếu bạn
                      gặp phải tin tuyển dụng hoặc nhận được liên lạc đáng ngờ
                      của nhà tuyển dụng, hãy báo cáo ngay cho chúng tôi qua
                      email hotro@gmail.com để được hỗ trợ kịp thời.
                    </li>
                    <li>
                      2. Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo{" "}
                      <a href="/" className="hover:underline text-cyan-600">
                        tại đây
                      </a>
                      .
                    </li>
                  </ol>
                </div>
              </Section>
            </CardContent>
            <div className="py-5 px-7 flex gap-3 border-t-[1px] shadow-lg">
              <Button
                className="min-w-[100px]"
                onClick={() => setHidden(true)}
                type="button"
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button
                className="shink-1 bg-cyan-600 hover:bg-cyan-500 grow"
                type="button"
                onClick={onSubmit}
                disabled={isPending || chosenIndex === null}
              >
                Nộp hồ sơ ứng tuyển
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
