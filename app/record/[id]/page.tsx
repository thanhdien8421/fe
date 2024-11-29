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
import { RecordType } from '../page'

export default function RecordView() {
    const [clicked, setClicked] = useState<Boolean>(false);
    const router = useRouter();
    const [content, setContent] = React.useState<RecordType>({title:"",description:"",fileCvLink:"",education: [], eduCheck: [], experience: [], expCheck: [], certificate: [], cerCheck: [] });
    // const form = useForm<z.infer<typeof RecordSchema>>({
    //     resolver: zodResolver(RecordSchema),
    //     defaultValues: {
    //         title: "",
    //         description: "",
    //         ownerId: 1,
    //         fileCV: ""
    //     }
    // })

    const onCheck = (data: RecordType) => {}

    async function onSubmit(values: z.infer<typeof RecordSchema>) {
        console.log(content)
        // if (result.success) router.push(''); 
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
                const [recordResponse] = await Promise.all([fetch(`http://localhost:8000/api/v1/records/${localStorage.getItem("userId")}`)]);

                if (!recordResponse.ok) {
                    throw new Error("Failed to fetch record.");
                }

                const recordData = await recordResponse.json();
                setContent({
                    ...content, 
                    title: recordData.data.title,
                    description: recordData.data.description
                }
                )
                console.log("++++")
                console.log(recordData)

                const [cerResponse, eduResponse, expResponse] = await Promise.all([
                    fetch(`http://localhost:8000/api/v1/records/${recordData.data.id}/certificates`),
                    fetch(`http://localhost:8000/api/v1/records/${recordData.data.id}/educations`),
                    fetch(`http://localhost:8000/api/v1/records/${recordData.data.id}/experiences`)
                ]);

                if (!expResponse || !cerResponse || !eduResponse) {
                    throw new Error("Failed to fetch one or more resources.");
                }

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
                console.log(cerData)
            } catch (error) {
                setError("An error occurred while fetching data.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [currentPage]); 

    const RecordForm: React.FC<RecordProps> = ({ data }) => {
        return (
            //<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
                <div className="block w-full p-6 bg-gray-100 border border-gray-300 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h1 className='min-h-10 border-b-1 rounded-b-none border-black border-l-0 border-t-0 border-r-0 bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>{data.title}</h1>
                    <p className='mt-8 min-h-40 h-fit bg-gray-100 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>{data.description}</p>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Thông tin cá nhân</p></div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Trình độ học vấn</p> {data.education.map((mem: EducationAttr) => <EducationCard obj={mem} type="preview" data={content} key={mem.id} onCheck={onCheck} />)}</div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Kinh nghiệm làm việc</p> {data.experience.map((mem: ExperienceAttr) => <ExperienceCard obj={mem} type="preview" data={content} key={mem.id} onCheck={onCheck} />)}</div>
                    <div className="flex flex-col gap-2"><p className="font-semibold text-gray-900 p-5 text-2xl">Bằng cấp, chứng chỉ</p> {data.certificate.map((mem: CertificateAttr) => <CertificateCard obj={mem} type="preview" data={content} key={mem.id} onCheck={onCheck} />)}</div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 pt-5">
                        <Label htmlFor="CV của bạn"><p className="font-semibold text-gray-900 p-5 text-2xl">CV của bạn</p></Label>
                    </div>

                </div>
                <div className='flex justify-center'>
                    <Button type="submit" className='bg-green-700 w-20'>
                        Chấp thuận
                    </Button>
                    <Button type="submit" className='bg-red-700 w-20'>
                        Từ chối
                    </Button>
                </div>
            </div>
            //</form>
        )
    }

    console.log(content.eduCheck)
    return (
        <div className='flex flex-row w-full gap-3 p-5'>
            <div className="flex flex-col w-1/2 justify-start gap-10">
                <RecordForm data={content} />
            </div>
        </div>
    )
}

interface RecordProps {
    data: RecordType
}