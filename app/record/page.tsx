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

export default function Record() {
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
  const form = useForm<z.infer<typeof RecordSchema>>({
    resolver: zodResolver(RecordSchema),
    defaultValues: {
      title: "",
      description: "",
      ownerId: 1,
      fileCV: "",
    },
  });
  const onCheck = (data: RecordType) => {
    setContent(data);
  };

  const CreateRecord = async (values: z.infer<typeof RecordSchema>) => {
    const dto = {
      title: values.title,
      description: values.description,
      ownerId: Number(localStorage.getItem("userId")),
      fileCvId: 1,
    };
    const apiUrl = `http://localhost:8000/api/v1/records`;

    return await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.error) {
          throw new Error("Error: " + data.error);
        } else {
          return {
            message: data.message,
            success: true,
            data: data.data,
          };
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

  const UpdateEduExpCer = async (recordId: number) => {
    try {
      const eduRes = await Promise.all(
        content.eduCheck.map((val, index) =>
          val
            ? fetch(
                `http://localhost:8000/api/v1/records/${recordId}/educations/${content.education[index].id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
            : null
        )
      );
      const expRes = await Promise.all(
        content.expCheck.map((val, index) =>
          val
            ? fetch(
                `http://localhost:8000/api/v1/records/${recordId}/experiences/${content.experience[index].id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
            : null
        )
      );
      const cerRes = await Promise.all(
        content.cerCheck.map((val, index) =>
          val
            ? fetch(
                `http://localhost:8000/api/v1/records/${recordId}/certificates/${content.certificate[index].id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
            : null
        )
      );

      // if (!certResponse.ok || !eduResponse.ok || !expResponse.ok) {
      //     throw new Error("Failed to fetch one or more resources.");
      // }

      const certData = cerRes
        .filter((val) => val !== null)
        .map((val) => val.json());
      const eduData = eduRes
        .filter((val) => val !== null)
        .map((val) => val.json());
      const expData = expRes
        .filter((val) => val !== null)
        .map((val) => val.json());
      console.log(eduData);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof RecordSchema>) {
    console.log(content);
    const result = await CreateRecord(values);
    console.log(result);
    const update = await UpdateEduExpCer(result.data.id);
    if ((result.success == true) == true) router.push("/profile");
  }

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("fileCV", file.name); // Store the file name or other necessary metadata
      // Upload logic here if required
    }
  }

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [certResponse, eduResponse, expResponse] = await Promise.all([
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
        ]);

        if (!certResponse.ok || !eduResponse.ok || !expResponse.ok) {
          throw new Error("Failed to fetch one or more resources.");
        }

        const certData = await certResponse.json();
        const eduData = await eduResponse.json();
        const expData = await expResponse.json();

        setContent({
          ...content,
          certificate: certData.data,
          cerCheck: certData.data.map(() => false),
          education: eduData.data,
          eduCheck: eduData.data.map(() => false),
          experience: expData.data,
          expCheck: expData.data.map(() => false),
        });
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [currentPage]);

  const RecordPreview: React.FC<RecordProps> = ({ data }) => {
    return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100">
            <Textarea
              {...form.register("title")}
              placeholder="Tiêu đề hồ sơ"
              className="text-2xl font-semibold w-full border-none focus:ring-0 resize-none bg-transparent placeholder:text-gray-400"
            />
            <Textarea
              {...form.register("description")}
              placeholder="Mô tả ngắn về bản thân và mục tiêu nghề nghiệp của bạn"
              className="mt-4 w-full min-h-[100px] border-none focus:ring-0 resize-none bg-transparent placeholder:text-gray-400"
            />
          </div>
  
          {/* Main Content */}
          <div className="p-6 space-y-8">
            {/* Personal Info Section */}
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Thông tin cá nhân
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                {/* Add personal info fields here */}
              </div>
            </section>
  
            {/* Education Section */}
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Trình độ học vấn
              </h2>
              <div className="space-y-4">
                {data.education.map((mem: EducationAttr) => (
                  <div key={mem.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-200">
                    <EducationCard
                      obj={mem}
                      type="preview"
                      data={content}
                      onCheck={onCheck}
                    />
                  </div>
                ))}
              </div>
            </section>
  
            {/* Experience Section */}
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kinh nghiệm làm việc
              </h2>
              <div className="space-y-4">
                {data.experience.map((mem: ExperienceAttr) => (
                  <div key={mem.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-200">
                    <ExperienceCard
                      obj={mem}
                      type="preview"
                      data={content}
                      onCheck={onCheck}
                    />
                  </div>
                ))}
              </div>
            </section>
  
            {/* Certificates Section */}
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                <svg className="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Bằng cấp, chứng chỉ
              </h2>
              <div className="space-y-4">
                {data.certificate.map((mem: CertificateAttr) => (
                  <div key={mem.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-200">
                    <CertificateCard
                      obj={mem}
                      type="preview"
                      data={content}
                      onCheck={onCheck}
                    />
                  </div>
                ))}
              </div>
            </section>
  
            {/* CV Upload Section */}
            <section>
              <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CV của bạn
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-gray-600">Kéo thả file hoặc click để tải lên</span>
                  <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max. 10MB)</span>
                </label>
              </div>
            </section>
          </div>
        </div>
  
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Lưu hồ sơ
          </Button>
        </div>
      </form>
    );
  };

  console.log(content.eduCheck);
  return (
    <div className="flex flex-row w-full gap-3 p-5">
      <div className="flex flex-col w-1/2 justify-start gap-10">
        <RecordPreview data={content} />
      </div>
      <div className="flex flex-col gap-5 w-1/2 h-fit">
        <Education type="" data={content} onCheck={onCheck} />
        <Experience type="" data={content} onCheck={onCheck} />
        <Certificate type="" data={content} onCheck={onCheck} />
      </div>
    </div>
  );
}

export interface RecordType {
  title: string;
  description: string;
  fileCvLink: string;
  education: EducationAttr[];
  eduCheck: Boolean[];
  experience: ExperienceAttr[];
  expCheck: Boolean[];
  certificate: CertificateAttr[];
  cerCheck: Boolean[];
}

interface RecordProps {
  data: RecordType;
}
