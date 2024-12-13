"use client";
import { ProfileUpdate } from "@/components/Common/profile";
import Profile from "@/components/Profile/profileForm";
import Education from "@/components/Profile/education";
import Certificate from "@/components/Profile/certificate";
import Experience from "@/components/Profile/experience";
import Record from "@/components/Profile/recordList";
import * as React from "react";
import { FaCamera } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SwitchForm } from "@/components/Common/toggle-follow";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import RecordList from "@/components/Profile/recordList";
import { RecordType } from "../record/page";
import { UserData } from "@/components/Profile/profileForm";
import { useState } from "react";

export default function Account() {
  const role = useSearchParams().get("role");
  const router = useRouter();
  const [content, setContent] = useState<RecordType>({
    title: "",
    description: "",
    fileCvLink: "",
    education: [],
    eduCheck: [],
    experience: [],
    expCheck: [],
    certificate: [],
    cerCheck: [],
  });
  const [recordlist, setRecord] = useState<
    {
      employeeId: number; // ID của nhân viên
      employeeName: string; // Tên của nhân viên (ví dụ: "Nguyễn Dũng")
      recordId: number; // ID của hồ sơ công việc (ví dụ: 1)
      recordTitle: string; // Tiêu đề của hồ sơ công việc (ví dụ: "Hồ sơ Java Developer")
      processedApplications: number; // Số lượng hồ sơ ứng tuyển đã được xử lý
      successfulApplications: number; // Số lượng hồ sơ ứng tuyển thành công
      successRate: number; // Tỷ lệ thành công (ví dụ: 100)
      performance: string; // Đánh giá hiệu suất công việc (ví dụ: "Rất tốt")
    }[]
  >([]);
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    phone: "",
    address: "",
    email: "",
    name: "",
    gender: "",
    birthday: "",
    avatar: "",
  });
  // const form = useForm<z.infer<typeof RecordSchema>>({
  //     resolver: zodResolver(RecordSchema),
  //     defaultValues: {
  //         title: "",
  //         description: "",
  //         ownerId: 1,
  //         fileCV: ""
  //     }
  // })
  const onCheck = (data: RecordType) => {
    setContent(data);
  };

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //         form.setValue("fileCV", file.name); // Store the file name or other necessary metadata
  //         // Upload logic here if required
  //     }
  // }

  const refetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/employees/${localStorage.getItem("userId")}`
      );
      if (!response.ok) {
        throw new Error("Failed to load user info");
      }
      let userInfo = await response.json();
      setUserData(userInfo.data);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    }
  }
  const refetchRecordData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/records/getRecordByOwn/${localStorage.getItem("userId")}`
      );
      if (!response.ok) {
        throw new Error("Failed to load record info");
      }
      let recordData = await response.json();
      setRecord(recordData.data);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    }
  }

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          userResponse,
          certResponse,
          eduResponse,
          expResponse,
          recordResponse,
          recordFull,
        ] = await Promise.all([
          fetch(
            `http://localhost:8000/api/v1/employees/${localStorage.getItem(
              "userId"
            )}`
          ),
          fetch(
            `http://localhost:8000/api/v1/certificates/employee/${localStorage.getItem(
              "userId"
            )}`
          ),
          fetch(
            `http://localhost:8000/api/v1/educations/employee/${localStorage.getItem(
              "userId"
            )}`
          ),
          fetch(
            `http://localhost:8000/api/v1/experiences/employee/${localStorage.getItem(
              "userId"
            )}`
          ),
          fetch(
            `http://localhost:8000/api/v1/employees/${localStorage.getItem(
              "userId"
            )}/application-stats`
          ),
          fetch(
            `http://localhost:8000/api/v1/records/getRecordByOwn/${localStorage.getItem(
              "userId"
            )}`
          ),
        ]);

        if (!userResponse.ok) {
          throw new Error("Failed to load user info");
        }

        let userInfo = await userResponse.json();
        let certData = await certResponse.json();
        let eduData = await eduResponse.json();
        let expData = await expResponse.json();
        let recordData = await recordResponse.json();
        let recordFullData = await recordFull.json();

        for (let i = 0; i < recordFullData.data.length; i++) {
          for (let j = 0; j < recordData.data.length; j++) {
            if (
              recordFullData.data[i].recordId == recordData.data[j].recordId
            ) {
              recordFullData.data[i] = recordData.data[j];
              break;
            }
          }
        }
        setContent({
          ...content,
          certificate: certData.data,
          cerCheck: certData.data.map(() => false),
          education: eduData.data,
          eduCheck: eduData.data.map(() => false),
          experience: expData.data,
          expCheck: expData.data.map(() => false),
        });
        setUserData(userInfo.data);
        setRecord(recordFullData.data);
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden bg-white">
              <div className="relative h-32 bg-gradient-to-r from-sky-500 to-indigo-500">
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 ring-4 ring-white">
                      <AvatarImage src="https://github.com/shadcn.png" className="object-cover" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-lg hover:bg-gray-50 transition">
                      <FaCamera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              <CardContent className="pt-16 pb-5">
                <div>
                  <p className="text-sm text-gray-500">Xin chào</p>
                  <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                    Ứng viên
                  </span>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900">
                    Chào mừng bạn trở lại <span className="text-sky-600">JobCenter</span>!
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Quản lý và cập nhật những thông tin lý lịch cần thiết cho công việc của bạn ngay tại đây.
                  </p>
                </div>
              </CardContent>
            </Card>
  
            {/* Profile Form */}
            {userData && <Profile refetch={refetchUserData} data={userData} />}
          </div>
  
          {/* Right Column */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Profile Control */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Trạng thái tìm việc</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Bật tìm việc để được nhà tuyển dụng tiếp cận nhanh hơn
                  </p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                  Bật tìm việc
                </button>
              </div>
            </div>
  
            {/* Records List */}
            <div className="bg-white rounded-lg shadow-sm">
              <RecordList data={recordlist} refetch={refetchRecordData}/>

            </div>
  
            {/* Education, Experience, Certificate sections with new styling */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Education type={"profile"} data={content} onCheck={onCheck} />
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Experience type={"profile"} data={content} onCheck={onCheck} />
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Certificate type={"profile"} data={content} onCheck={onCheck} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
