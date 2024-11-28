"use client";
import * as React from "react";
import { FaCamera } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdateSchema } from "@/schema/ProfileSchema";
import { useForm } from "react-hook-form";

export default function Profile() {
    const [email, setEmail] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [nameUser, setNameUser] = React.useState("");
    const role = useSearchParams().get("role");
    const [isPending, startTransition] = React.useTransition()

    const router = useRouter()

    const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
        resolver: zodResolver(ProfileUpdateSchema),
        defaultValues: {
            email: "a@gmail.com",
            password: " ",
            phone: "",
            address: "",
            name: "",
            gender: "",
            age: 18
        }
    })

    function onSubmit(values: z.infer<typeof ProfileUpdateSchema>) {
        startTransition(async () => {
            // const result = await FirstUpdateProfile(values);
            // if (result.success) {
            //     toast.success(result.message);
            //     router.push("/login");
            // } else toast.error("Đã xảy ra lỗi");
        });
    }

    React.useEffect(() => {
        // Chỉ truy cập localStorage trong client-side
        const storedEmail = localStorage.getItem("userEmail");
        const storedUserId = localStorage.getItem("userId");
        const storedNameUser = localStorage.getItem("userName");

        if (storedEmail) setEmail(storedEmail);
        if (storedUserId) setUserId(storedUserId);
        if (storedNameUser) setNameUser(storedNameUser);
    }, []);
    return (
        <Form {...form}>
            <Card className="drop-shadow-sm">
                <CardHeader className="w-full">
                    <CardTitle className="text-3xl font-bold">Thông tin cá nhân</CardTitle>
                    <CardDescription>
                       Thông tin của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="" disabled={isPending} />
                                    </FormControl>
                                    <FormDescription>
                                        Số điện thoại liên hệ
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormDescription>
                                        Địa chỉ nơi ở
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tuổi</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} />
                                    </FormControl>
                                    <FormDescription>
                                        Tuổi của bạn
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giới tính</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Nam">Nam</SelectItem>
                                            <SelectItem value="Nữ">Nữ</SelectItem>
                                            <SelectItem value="Khác">Khác</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Giới tính
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending} className="bg-blue-800">Cập nhật</Button>
                    </form>
                </CardContent>
            </Card>
        </Form>
    )
}
