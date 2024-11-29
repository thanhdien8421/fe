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
import { Interface } from 'readline'

export default function Record() {
    const [clicked, setClicked] = useState<Boolean>(false);
    const router = useRouter();
    const [content, setContent] = React.useState<RecordType>({title:"",description:"",fileCvLink:"",education: [], eduCheck: [], experience: [], expCheck: [], certificate: [], cerCheck: [] });
    const form = useForm<z.infer<typeof RecordSchema>>({
        resolver: zodResolver(RecordSchema),
        defaultValues: {
            title: "",
            description: "",
            ownerId: 1,
            fileCV: ""
        }
    })
    const onCheck = (data: RecordType) => {
        setContent(data);
    }

    const CreateRecord = async (values: z.infer<typeof RecordSchema>) => {
        const dto = {
            title: values.title,
            description: values.description,
            ownerId: Number(localStorage.getItem("userId")),
            fileCvId: 1
        }
        const apiUrl = `http://localhost:8000/api/v1/records`

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
    }

    const UpdateEduExpCer = async (recordId : number) => {
        try {
            const eduRes = await Promise.all(content.eduCheck.map((val, index) => val ? fetch(
                `http://localhost:8000/api/v1/records/${recordId}/educations/${content.education[index].id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }}) 
                    : null  
            ))
            const expRes = await Promise.all(content.expCheck.map((val, index) => val ? fetch(
                `http://localhost:8000/api/v1/records/${recordId}/experiences/${content.experience[index].id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }}) 
                    : null  
            ))
            const cerRes = await Promise.all(content.cerCheck.map((val, index) => val ? fetch(
                `http://localhost:8000/api/v1/records/${recordId}/certificates/${content.certificate[index].id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }}) 
                    : null) 
            )

            // if (!certResponse.ok || !eduResponse.ok || !expResponse.ok) {
            //     throw new Error("Failed to fetch one or more resources.");
            // }

            const certData = cerRes.filter((val)=>(val !== null)).map((val) => val.json());
            const eduData = eduRes.filter((val)=>(val !== null)).map((val) => val.json());
            const expData = expRes.filter((val)=>(val !== null)).map((val) => val.json());
            console.log(eduData)
        } catch (error) {
            setError("An error occurred while fetching data.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    async function onSubmit(values: z.infer<typeof RecordSchema>) {
        console.log(content)
        const result = await CreateRecord(values);
        console.log(result);
        const update = await UpdateEduExpCer(result.data.id);
        if (result.success) router.push('/profile'); 
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
                    fetch(`http://localhost:8000/api/v1/certificates/employee/1`),
                    fetch(`http://localhost:8000/api/v1/educations/employee/1`),
                    fetch(`http://localhost:8000/api/v1/experiences/employee/1`)
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
                    expCheck: expData.data.map(() => false)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="block w-full p-6 bg-gray-100 border border-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <Textarea {...form.register("title")} placeholder="Title" className='min-h-10 border-b-1 rounded-b-none border-black border-l-0 border-t-0 border-r-0 bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700' />
                    <Textarea {...form.register("description")} placeholder="Title" className='mt-8 min-h-40 h-fit bg-gray-100 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' />
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Thông tin cá nhân</p></div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Trình độ học vấn</p> {data.education.map((mem: EducationAttr) => <EducationCard obj={mem} type="preview" data={content} key={mem.id} onCheck={onCheck} />)}</div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Kinh nghiệm làm việc</p> {data.experience.map((mem: ExperienceAttr) => <ExperienceCard obj={mem} type="preview" data={content} key={mem.id} onCheck={onCheck} />)}</div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Bằng cấp, chứng chỉ</p> {data.certificate.map((mem: CertificateAttr) => <CertificateCard obj={mem} type="preview" data={content} key={mem.id} onCheck={onCheck} />)}</div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 pt-5">
                        <Label htmlFor="CV của bạn"><p className="font-semibold text-gray-900 p-5 text-2xl">CV của bạn</p></Label>
                        <Input id="file" type="file" onChange={handleFileUpload} />
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

    console.log(content.eduCheck)
    return (
        <div className='flex flex-row w-full gap-3 p-5'>
            <div className="flex flex-col w-1/2 justify-start gap-10">
                <RecordPreview data={content} />
            </div>
            <div className="flex flex-col gap-5 w-1/2 h-fit">
                <Education type="" data={content} onCheck={onCheck} />
                <Experience type="" data={content} onCheck={onCheck} />
                <Certificate type="" data={content} onCheck={onCheck} />
            </div>
        </div>
    )
}

export interface RecordType {
    title: string;
    description: string;
    fileCvLink:string;
    education: EducationAttr[];
    eduCheck: Boolean[];
    experience: ExperienceAttr[];
    expCheck: Boolean[];
    certificate: CertificateAttr[];
    cerCheck: Boolean[];
}

interface RecordProps {
    data: RecordType
}