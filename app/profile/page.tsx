"use client";
import { ProfileUpdate } from "@/components/Common/profile"
import Profile from "@/components/Profile/profileForm"
import Education from "@/components/Profile/education"
import Certificate from "@/components/Profile/certificate"
import Experience from "@/components/Profile/experience"
import Record from "@/components/Profile/recordList"
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
    const [content, setContent] = useState<RecordType>({ title: "", description: "", fileCvLink: "", education: [], eduCheck: [], experience: [], expCheck: [], certificate: [], cerCheck: [] });
    const [recordlist, setRecord] = useState<{ id: number; title: string; description: string; ownerId: number; fileCvId: number }[]>([])
    const [userData, setUserData] = useState<UserData>({id:0,phone:"",address:"",email: "",name: "",gender:"",age:18,avatar:""})
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
                const [userResponse, certResponse, eduResponse, expResponse, recordResponse] = await Promise.all([
                    fetch(`http://localhost:8000/api/v1/employees/${localStorage.getItem("userId")}`),
                    fetch(`http://localhost:8000/api/v1/certificates/employee/${localStorage.getItem("userId")}`),
                    fetch(`http://localhost:8000/api/v1/educations/employee/${localStorage.getItem("userId")}`),
                    fetch(`http://localhost:8000/api/v1/experiences/employee/${localStorage.getItem("userId")}`),
                    fetch(`http://localhost:8000/api/v1/records/employee/${localStorage.getItem("userId")}`)
                ]);

                if (!userResponse.ok) {
                    throw new Error("Failed to load user info");
                }
                
                const userInfo = await userResponse.json();
                const certData = await certResponse.json();
                const eduData = await eduResponse.json();
                const expData = await expResponse.json();
                const recordData = await recordResponse.json();

                setContent({
                    ...content,
                    certificate: certData.data,
                    cerCheck: certData.data.map(() => false),
                    education: eduData.data,
                    eduCheck: eduData.data.map(() => false),
                    experience: expData.data,
                    expCheck: expData.data.map(() => false)
                });
                setUserData(userInfo.data)
                setRecord(recordData.data)
            } catch (error) {
                setError("An error occurred while fetching data.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [currentPage]);

    console.log(content);
    console.log(userData);
    return (
        <div className="flex flex-row p-2 gap-20 ">
            <div className="flex flex-col w-1/3 gap-5">
                <div className="w-2/3 flex flex-col items-center mt-5">
                    <Card className="h-fit drop-shadow-md">
                        <CardContent className="my-5 border-b-2">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <FaCamera className="absolute bottom-0 text-cyan-500 left-1" />
                                </div>
                                <div>
                                    <p>Xin chào</p>
                                    <p className="font-bold">{userData.name}</p>
                                    <div className="bg-gray-600 text-[10px] text-white text-center py-1 px-1">
                                        Ứng viên
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <h1 className="text-justify p-3">
                                Chào mừng bạn trở lại <b>JobCenter</b>!
                            </h1>
                            <p className="max-w-[300px] text-justify">
                                Quản lý và cập nhật những thông tin lý lịch cần thiết cho công việc của bạn ngay tại đây.
                            </p>
                        </CardFooter>
                    </Card>
                </div>
                <Profile data={userData}/>
            </div>
            <div className="flex flex-col gap-5 w-3/5 h-fit pt-5 pb-5">
                <RecordList data={recordlist}/>
                <Education type={"profile"} data={content} onCheck={onCheck} />
                <Experience type={"profile"} data={content} onCheck={onCheck} />
                <Certificate type={"profile"} data={content} onCheck={onCheck} />
            </div>
        </div>
    )
}
