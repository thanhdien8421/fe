"use client";
import Certificate, {
  CertificateAttr,
  CertificateCard,
} from "@/components/Profile/certificate";
import Education, {
  EducationAttr,
  EducationCard,
} from "@/components/Profile/education";
import Experience, {
  ExperienceAttr,
  ExperienceCard,
} from "@/components/Profile/experience";
import { useState } from "react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RecordSchema } from "@/schema/RecordSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Interface } from "readline";
import { RecordType } from "../page";
import { UserData } from "@/components/Profile/profileForm";
import Image from "next/image";
import Link from "next/link";

export default function RecordView({ params }: { params: { id: string } }) {
  let recordId = params.id;
  let postId = localStorage.getItem("postId");
  const [clicked, setClicked] = useState<Boolean>(false);
  const router = useRouter();
  const [content, setContent] = React.useState<RecordType>({
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

  const onCheck = (data: RecordType) => {};

  async function onSubmit(values: z.infer<typeof RecordSchema>) {
    // if (result.success==true) router.push('');
  }

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

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [recordResponse] = await Promise.all([
          fetch(
            `http://localhost:8000/api/v1/records/${localStorage.getItem(
              "userId"
            )}`
          ),
        ]);
        if (!recordResponse.ok) {
          throw new Error("Failed to fetch record.");
        }

        const recordData = await recordResponse.json();
        setContent({
          ...content,
          title: recordData.data.title,
          description: recordData.data.description,
        });

        const [userResponse, cerResponse, eduResponse, expResponse] =
          await Promise.all([
            fetch(
              `http://localhost:8000/api/v1/employees/${localStorage.getItem(
                "userId"
              )}`
            ),
            fetch(
              `http://localhost:8000/api/v1/records/${recordData.data.id}/certificates`
            ),
            fetch(
              `http://localhost:8000/api/v1/records/${recordData.data.id}/educations`
            ),
            fetch(
              `http://localhost:8000/api/v1/records/${recordData.data.id}/experiences`
            ),
          ]);

        if (!userResponse.ok) {
          throw new Error("Failed to fetch one or more resources.");
        }

        const userInfo = await userResponse.json();
        const cerData = await cerResponse.json();
        const eduData = await eduResponse.json();
        const expData = await expResponse.json();

        setContent({
          ...content,
          certificate: cerData.data,
          cerCheck: cerData.data.map(() => true),
          education: eduData.data,
          eduCheck: eduData.data.map(() => true),
          experience: expData.data,
          expCheck: expData.data.map(() => true),
        });
        setUserData(userInfo.data);
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [currentPage]);

  const AcceptCV = async () => {
    let recruitmentPostId = 1;
    if (postId !== null) {
      // Chuyển đổi postId thành số nguyên
      recruitmentPostId = parseInt(postId, 10);

      // Kiểm tra nếu recruitmentPostId là một số hợp lệ
      if (!isNaN(recruitmentPostId)) {
        console.log("Recruitment Post ID:", recruitmentPostId);
      } else {
        console.error("Invalid postId, could not convert to integer.");
      }
    } else {
      console.error("No postId found in localStorage.");
    }
    const data = {
      recordId: parseInt(recordId, 10),
      status: "Đã chấp nhận",
      recruitmentPostId: recruitmentPostId,
    };
    const apiUrl = `http://localhost:8000/api/v1/records-post`;

    return await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error("Error: " + data.error);
        } else {
          router.push(`/recruitment/manage/recordApply/${postId}`);
        }
      })
      .catch((error) => {
        return {
          message: error,
          success: false,
          data: null,
        };
      });
  };
  const DenyCV = async () => {
    let recruitmentPostId = 1;
    if (postId !== null) {
      // Chuyển đổi postId thành số nguyên
      recruitmentPostId = parseInt(postId, 10);

      // Kiểm tra nếu recruitmentPostId là một số hợp lệ
      if (!isNaN(recruitmentPostId)) {
        console.log("Recruitment Post ID:", recruitmentPostId);
      } else {
        console.error("Invalid postId, could not convert to integer.");
      }
    } else {
      console.error("No postId found in localStorage.");
    }

    const data = {
      recordId: parseInt(recordId, 10),
      status: "Đã từ chối",
      recruitmentPostId: recruitmentPostId,
    };
    const apiUrl = `http://localhost:8000/api/v1/records-post`;

    return await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error("Error: " + data.error);
        } else {
          router.push(`/recruitment/manage/recordApply/${postId}`);
        }
      })
      .catch((error) => {
        return {
          message: error,
          success: false,
          data: null,
        };
      });
  };
  const PendingCv = async () => {
    let recruitmentPostId = 1;
    if (postId !== null) {
      // Chuyển đổi postId thành số nguyên
      recruitmentPostId = parseInt(postId, 10);

      // Kiểm tra nếu recruitmentPostId là một số hợp lệ
      if (!isNaN(recruitmentPostId)) {
        console.log("Recruitment Post ID:", recruitmentPostId);
      } else {
        console.error("Invalid postId, could not convert to integer.");
      }
    } else {
      console.error("No postId found in localStorage.");
    }

    const data = {
      recordId: parseInt(recordId, 10),
      status: "Đang chờ xét duyệt",
      recruitmentPostId: recruitmentPostId,
    };
    const apiUrl = `http://localhost:8000/api/v1/records-post`;

    return await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error("Error: " + data.error);
        } else {
          router.push(`/recruitment/manage/recordApply/${postId}`);
        }
      })
      .catch((error) => {
        return {
          message: error,
          success: false,
          data: null,
        };
      });
  };
  const formatBirthday = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const RecordForm: React.FC<RecordProps> = ({ data }) => {
    return (
      <div className="flex flex-col items-center m-auto p-5 gap-5 bg-custom">
        <div className="block w-full p-6 text-2xl font-semibold bg-gray-100 border border-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h1 className="min-h-10 border-b-1 rounded-b-none border-black border-l-0 border-t-0 border-r-0 bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            Thông tin cá nhân
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:space-x-12">
              <div className="flex flex-col items-center space-y-4 md:pr-8 md:border-r border-gray-200">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={userData.avatar || "/default-avatar.png"}
                      alt="Hình ảnh đại diện"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <p className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {userData.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="text-gray-900 font-medium">
                        {userData.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="text-gray-900 font-medium">
                        {userData.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Ngày sinh</p>
                          <p className="text-gray-900 font-medium">
                            {formatBirthday(userData.birthday)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Giới tính</p>
                          <p className="text-gray-900 font-medium">
                            {userData.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-900 p-5 text-2xl">
              Trình độ học vấn
            </p>{" "}
            {data.education.map((mem: EducationAttr) => (
              <EducationCard
                obj={mem}
                type="preview"
                data={content}
                key={mem.id}
                onCheck={onCheck}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-900 p-5 text-2xl">
              Kinh nghiệm làm việc
            </p>{" "}
            {data.experience.map((mem: ExperienceAttr) => (
              <ExperienceCard
                obj={mem}
                type="preview"
                data={content}
                key={mem.id}
                onCheck={onCheck}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-900 p-5 text-2xl">
              Bằng cấp, chứng chỉ
            </p>{" "}
            {data.certificate.map((mem: CertificateAttr) => (
              <CertificateCard
                obj={mem}
                type="preview"
                data={content}
                key={mem.id}
                onCheck={onCheck}
              />
            ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 pt-5">
            <Label htmlFor="CV đính kèm">
              <p className="font-semibold text-gray-900 p-5 text-2xl">
                CV đính kèm
              </p>
            </Label>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <Button
            onClick={AcceptCV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Chấp thuận
          </Button>

          <Button
            onClick={DenyCV}
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Từ chối
          </Button>

          <Button
            onClick={PendingCv}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-amber-200 hover:shadow-amber-300 transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Chờ xét duyệt
          </Button>

          <Button
            onClick={() =>
              router.push(`/recruitment/manage/recordApply/${postId}`)
            }
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-gray-200 hover:shadow-gray-300 transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Thoát
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row bg-custom">
      <div className=""></div>
      <RecordForm data={content} />
      <div className=""></div>
    </div>
  );
}

interface RecordProps {
  data: RecordType;
}
