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
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { formatFileSize, iconFiles } from "@/utils/constant";

export default function Record() {
  const [clicked, setClicked] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
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

  const CreateRecord = async (
    values: z.infer<typeof RecordSchema>,
    fileCvId?: number
  ) => {
    const dto = {
      title: values.title,
      description: values.description,
      ownerId: Number(localStorage.getItem("userId")),
      fileCvId: fileCvId ? fileCvId : null,
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
        setIsLoading(false);
        return {
          message: error,
          success: false,
          data: null,
        };
      });
  };

  const CreateFileCv = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const rs = await fetch(`http://localhost:8000/api/v1/files/upload`, {
      method: "POST",
      body: formData,
    });
    console.log(rs);
    return rs.json();
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
    if (file === null) alert("Vui lòng tải lên CV của bạn");
    else {
      setIsLoading(true);
      let addedCv = null;
      if (file) addedCv = await CreateFileCv(file);
      const result = await CreateRecord(
        values,
        addedCv ? addedCv?.data.id : null
      );
      console.log(result);
      const update = await UpdateEduExpCer(result.data.id);
      setIsLoading(false);
      if ((result.success == true) == true) router.push("/profile");
    }
  }

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file); // Store the file name or other necessary metadata
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
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <Textarea
              {...form.register("title")}
              placeholder="Tiêu đề hồ sơ"
              className="text-3xl font-bold w-full border-none focus:ring-0 resize-none bg-transparent placeholder:text-gray-400"
            />
            <Textarea
              {...form.register("description")}
              placeholder="Mô tả ngắn về bản thân và mục tiêu nghề nghiệp của bạn"
              className="mt-4 w-full min-h-[100px] border-none focus:ring-0 resize-none bg-transparent placeholder:text-gray-400 text-gray-600"
            />
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-10">
            {/* Sections styling */}
            <section>
              <h2 className="flex items-center text-xl font-bold text-gray-800 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <svg className="w-6 h-6" />
                </span>
                Trình độ học vấn
              </h2>
              <div className="space-y-4">
                {data.education.map(
                  (mem: EducationAttr, index: number) =>
                    data.eduCheck[index] && (
                      <div
                        key={mem.id}
                        className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                      >
                        <EducationCard
                          obj={mem}
                          type="preview"
                          data={content}
                          onCheck={onCheck}
                        />
                      </div>
                    )
                )}
              </div>
            </section>

            <section>
              <h2 className="flex items-center text-xl font-bold text-gray-800 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mr-3">
                  <svg className="w-6 h-6" />
                </span>
                Kinh nghiệm làm việc
              </h2>
              <div className="space-y-4">
                {data.experience.map(
                  (mem: ExperienceAttr, index: number) =>
                    data.expCheck[index] && (
                      <div
                        key={mem.id}
                        className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                      >
                        <ExperienceCard
                          obj={mem}
                          type="preview"
                          data={content}
                          onCheck={onCheck}
                        />
                      </div>
                    )
                )}
              </div>
            </section>

            {/* Certificate Section */}
            <section>
              <h2 className="flex items-center text-xl font-bold text-gray-800 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 mr-3">
                  <svg className="w-6 h-6" />
                </span>
                Chứng chỉ
              </h2>
              <div className="space-y-4">
                {data.certificate.map(
                  (mem: CertificateAttr, index: number) =>
                    // Chỉ hiển thị certificate khi cerCheck[index] là true
                    data.cerCheck[index] && (
                      <div
                        key={mem.id}
                        className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                      >
                        <CertificateCard
                          obj={mem}
                          type="preview"
                          data={content}
                          onCheck={onCheck}
                        />
                      </div>
                    )
                )}
              </div>
            </section>

            {/* CV Upload Section */}
            <section>
              <h2 className="flex items-center text-xl font-bold text-gray-800 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 mr-3">
                  <svg className="w-6 h-6" />
                </span>
                CV của bạn
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-300">
                {file ? (
                  <div className="flex items-center gap-4">
                    {iconFiles.map((icon) => {
                      if (icon.type === file.type) {
                        const Icon = icon.icon;
                        return <Icon className={`w-8 h-8 ${icon.color}`} />;
                      }
                    })}
                    <div className="flex flex-col gap-3">
                      <span className="text-md font-bold">{file.name}</span>
                      <span className="text-gray-500">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="file"
                      className="flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                        <svg className="w-8 h-8 text-blue-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Kéo thả file hoặc click để tải lên
                      </span>
                      <span className="text-xs text-gray-500 mt-2">
                        PDF, DOC, DOCX (Max. 10MB)
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 font-medium"
          >
            Lưu hồ sơ
          </Button>
        </div>
      </form>
    );
  };

  console.log(content.eduCheck);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-row gap-6">
          {/* Left Column - Preview */}
          <div className="w-1/2">
            <div className="sticky top-24">
              <RecordPreview data={content} />
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="w-1/2 space-y-6">
            <Education type="" data={content} onCheck={onCheck} />
            <Experience type="" data={content} onCheck={onCheck} />
            <Certificate type="" data={content} onCheck={onCheck} />
          </div>
        </div>
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
