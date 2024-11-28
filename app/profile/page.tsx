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
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import RecordList from "@/components/Profile/recordList";

export default function Account() {
    const [nameUser, setNameUser] = React.useState("");
    const role = useSearchParams().get("role");
    return (
        <div className="flex flex-row p-2 gap-5 ">
            {/* <ProfileUpdate/> */}
            <div className="flex flex-col w-1/3 gap-5">
                <Card>
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
                                <p className="font-bold">{nameUser}</p>
                                <div className="bg-gray-600 text-[10px] text-white text-center py-1 px-1">
                                    {role == "1" ? " Ứng viên " : " Nhà tuyển dụng "}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {role == "1" ? (
                            <SwitchForm />
                        ) : (
                            <p className="max-w-[300px] text-justify">
                                Bạn chỉ có thể toàn tâm toàn ý khi được làm những gì bạn yêu
                                thích. Đừng lấy tiền làm mục tiêu của mình. Thay vào đó, hãy theo
                                đuổi những điều bạn yêu thích và cố gắng làm thật tốt. Đến khi đó,
                                bạn sẽ nhận được ánh mắt tôn trọng và ngưỡng mộ từ những người
                                xung quanh <br></br>{" "}
                                <b>
                                    <i>Maya Angelou</i>
                                </b>
                            </p>
                        )}
                    </CardFooter>
                </Card>
                <Profile />
            </div>
            <div className="flex flex-col gap-5 w-2/3 h-fit">
                    <RecordList/>
                    <Education type={"profile"} getData={''}/>
                    <Experience type={"profile"} getData={''}/>
                    <Certificate type={"profile"} getData={''}/>
            </div>
        </div>
    )
}
