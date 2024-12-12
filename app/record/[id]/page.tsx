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
  const RecordForm: React.FC<RecordProps> = ({ data }) => {
    return (
      <div className="flex flex-col items-center w-1/2 p-5 gap-5">
        <div className="block w-full p-6 text-2xl font-semibold bg-gray-100 border border-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h1 className="min-h-10 border-b-1 rounded-b-none border-black border-l-0 border-t-0 border-r-0 bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            Thông tin cá nhân
          </h1>
          <div className="flex flex-row border-2 border-gray-500 m-2 p-5 gap-10">
            <div className="flex flex-col justify-center">
              <img
                src={userData.avatar}
                alt={"Hình ảnh đại diện"}
                width={100}
                height={100}
                className="justify-self-center"
              />
              <p>{userData.name}</p>
            </div>
            <div className="grid grid-cols-1 items-start text-base font-mono text-normal">
              <div className="grid grid-cols-3 justify-between">
                <p>Email:</p>
                <p>{userData.email}</p>
              </div>
              <div className="grid grid-cols-3 justify-between">
                <p>Địa chỉ:</p>
                <p>{userData.address}</p>
              </div>
              <div className="grid grid-cols-3 justify-between">
                <p>Số điện thoại:</p>
                <p>{userData.phone}</p>
              </div>
              <div className="grid grid-cols-3 justify-between">
                <p>Tuổi:</p>
                <p>{userData.birthday}</p>
              </div>
              <div className="grid grid-cols-3 justify-between">
                <p>Giới tính:</p>
                <p>{userData.gender}</p>
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
        <div className="flex justify-center gap-10">
          <Button
            type="submit"
            className="bg-green-700 w-20"
            onClick={AcceptCV}
          >
            Chấp thuận
          </Button>
          <Button type="submit" className="bg-red-700 w-20" onClick={DenyCV}>
            Từ chối
          </Button>
          <Button
            type="submit"
            className="bg-yellow-700 w-28"
            onClick={PendingCv}
          >
            Chờ xét duyệt
          </Button>
          <Button
            type="submit"
            className="bg-gray-600 w-20"
            onClick={() => {
              router.push(`/recruitment/manage/recordApply/${postId}`);
            }}
          >
            Thoát
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row">
      <div className="w-1/4"></div>
      <RecordForm data={content} />
      <div className="w-1/4"></div>
    </div>
  );
}

interface RecordProps {
  data: RecordType;
}
