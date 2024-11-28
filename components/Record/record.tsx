"use client"
import Certificate, { CertificateAttr, CertificateCard } from '@/components/Profile/certificate'
import Education, { EducationAttr, EducationCard } from '@/components/Profile/education'
import Experience, { ExperienceAttr, ExperienceCard } from '@/components/Profile/experience'
import { useState } from 'react'
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form';
import { RecordSchema } from '@/schema/RecordSchema'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Record() {
    const data: RecordData = {
        title: "Bản mẫu Record",
        description: "Bản mẫu đầu tiên để xác định định dạng",
        education: [{
            id: 1,
            school: "HCMUT",
            major: "KHMT",
            description: "Cử nhân",
            startDate: "1/1/2000",
            endDate: "1/1/2004"
        }, {
            id: 2,
            school: "HCMUT",
            major: "KHMT",
            description: "Cử nhân",
            startDate: "1/1/2000",
            endDate: "1/1/2004"
        }, {
            id: 3,
            school: "HCMUT",
            major: "KHMT",
            description: "Cử nhân",
            startDate: "1/1/2000",
            endDate: "1/1/2004"
        }],
        experience: [{
            id: 1,
            company: "LNG",
            position: "Trưởng phòng",
            description: "abcd",
            startDate: "1/1/2000",
            endDate: "1/1/2004",
        },
        {
            id: 2,
            company: "LNG",
            position: "Trưởng phòng",
            description: "abcd",
            startDate: "1/1/2000",
            endDate: "1/1/2004"
        },
        {
            id: 3,
            company: "LNG",
            position: "Trưởng phòng",
            description: "abcd",
            startDate: "1/1/2000",
            endDate: "1/1/2004"
        }],
        certificate: [{
            id: 1,
            name: "IELTS",
            organization: "IDP",
            verifiedDate: "1/1/2020",
        },
        {
            id: 2,
            name: "IELTS",
            organization: "IDP",
            verifiedDate: "1/1/2020",
        },
        {
            id: 3,
            name: "IELTS",
            organization: "IDP",
            verifiedDate: "1/1/2020",
        }],
        CV: "Link file CV"
    }

    const [object, setObject] = useState<RecordType>({ title: "", description: "", education: [], experience: [], certificate: [], CV: "" });
    const [clicked, setClicked] = useState<Boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof RecordSchema>>({
        resolver: zodResolver(RecordSchema),
        defaultValues: {
            title: "",
            description: "",
            ownerId: 1,
            fileCV: ""
        }
    })

    const CreateRecord = async (obj: RecordType) => {
        const apiUrl = `http://localhost:8000/api/v1/records`

        return await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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
                        data: data.data[0],
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
    }

    async function onSubmit() {
        // const result = await CreateRecord(object);
        // if (result.success) router.push('/profile');
        console.log(object)
    }

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string>("");
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const fetchCertificate = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/certificates`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setData({...datas, education: data.data.result});
        } catch (error) {
            setError("Lỗi");
        } finally {
            setLoading(false);
        }
    };
    const fetchEducation = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/educations`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setData({...datas, education: data.data});
        } catch (error) {
          setError("Lỗi");
        } finally {
          setLoading(false);
        }
    };
    const fetchExperience = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/experiences`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setData({...datas, education: data.data});
        } catch (error) {
          setError("Lỗi");
        } finally {
          setLoading(false);
        }
    };

    const [datas, setData] = React.useState<RecordData>({title:"",description:"",education:[],experience:[], certificate:[], CV:""});
    // fetchCertificate();
    // fetchEducation();
    // fetchExperience();
    console.log(datas);
    
    React.useEffect(() => {
        //Promise.all([fetchCertificate(), fetchEducation(), fetchExperience]);
    }, [currentPage]); // Chạy lại khi currentPage hoặc pageSize thay đổi

    const RecordPreview: React.FC<RecordProps> = async ({ data }) => {
        return (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="block w-full p-6 bg-gray-100 border border-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <Textarea {...form.register("title")} placeholder="Title" className='min-h-10 border-b-1 rounded-b-none border-black border-l-0 border-t-0 border-r-0 bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700' />
                    <Textarea {...form.register("description")} placeholder="Title" className='mt-8 min-h-40 h-fit bg-gray-100 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' />
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Thông tin cá nhân</p></div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Trình độ học vấn</p> {data.education.map((mem: EducationAttr) => <EducationCard obj={mem} type="preview" getData={object} key={mem.id} />)}</div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Kinh nghiệm làm việc</p> {data.experience.map((mem: ExperienceAttr) => <ExperienceCard obj={mem} type="preview" getData={object} key={mem.id} />)}</div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Bằng cấp, chứng chỉ</p> {data.certificate.map((mem: CertificateAttr) => <CertificateCard obj={mem} type="preview" getData={object} key={mem.id} />)}</div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 pt-5">
                        <Label htmlFor="CV của bạn"><p className="font-semibold text-gray-900 p-5 text-2xl">CV của bạn</p></Label>
                        <Input id="picture" type="file" {...form.register("fileCV")} />
                    </div>

                </div>
                <div className='flex justify-center'>
                    <Button type="submit" className='bg-blue-700 w-20'>
                        Lưu
                    </Button>
                </div>
            </form>
        )
    }
    
    return (
        <div className='flex flex-row w-full gap-3 p-5'>
            <div className="flex flex-col w-1/2 justify-start gap-10">
                <RecordPreview data={datas} />
            </div>
            <div className="flex flex-col gap-5 w-1/2 h-fit">
                <Education type="" getData={object} />
                <Experience type="" getData={object} />
                <Certificate type="" getData={object} />
            </div>
        </div>
    )
}

export interface RecordType {
    title: string;
    description: string;
    education: number[];
    experience: number[];
    certificate: number[];
    CV: string;
}

export interface RecordData {
    title: string;
    description: string;
    education: EducationAttr[];
    experience: ExperienceAttr[];
    certificate: CertificateAttr[];
    CV: string;
}

interface RecordProps {
    data: RecordData
}