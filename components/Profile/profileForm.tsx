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
} from "@/components/ui/select";
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
import { useEffect } from "react";

export default function Profile({ data, refetch }: { data: UserData, refetch: () => void }) {
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [nameUser, setNameUser] = React.useState("");
  const role = useSearchParams().get("role");
  const [isPending, startTransition] = React.useTransition();
  const [isUpdating, setIsUpdating] = React.useState(false); // Thêm state kiểm soát
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      email: data.email,
      // password: " ",
      phone: data.phone,
      address: data.address,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
    },
  });

  useEffect(() => {
    form.reset({
      email: data.email,
      phone: data.phone,
      address: data.address,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday
    });
  }, [data]);

  async function onSubmit(values: z.infer<typeof ProfileUpdateSchema>) {
    console.log(values);
    const rs = await fetch(`http://localhost:8000/api/v1/employees/${localStorage.getItem('userId')}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
    console.log(rs);
    if (rs.statusCode === 200) {
      toast.success(rs.message);
      refetch();
      setIsUpdating(false);
    }
    // startTransition(async () => {
    //   // const result = await FirstUpdateProfile(values);
    //   // if (result.success==true) {
    //   //     toast.success(result.message);
    //   //     router.push("/login");
    //   // } else toast.error("Đã xảy ra lỗi");
    // });
  }

  return (
    <Form {...form}>
      <div>
        <Toaster />
      </div>
      <Card className="drop-shadow-sm w-full">
        <CardHeader className="w-full">
          <CardTitle className="text-3xl font-bold">
            Thông tin cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên người dùng</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isUpdating} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isUpdating} />
                  </FormControl>
                  <FormDescription>Số điện thoại liên hệ</FormDescription>
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
                    <Input {...field} disabled={!isUpdating}/>
                  </FormControl>
                  <FormDescription>Địa chỉ nơi ở</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>
                    Ngày sinh
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isUpdating}
                      {...field}
                      type="date"
                      onChange={(e) => {
                        const isoDate = new Date(e.target.value).toISOString(); // Chuyển sang dạng ISO string
                        field.onChange(isoDate); // Cập nhật giá trị
                      }}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      } // Hiển thị ngày theo định dạng 'YYYY-MM-DD'
                      className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 mt-1">
                    Chọn ngày sinh của bạn
                  </FormDescription>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isUpdating}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              isUpdating ? (
                <div className="flex gap-5">
                  <Button variant={"destructive"} onClick={() => setIsUpdating(false)}>
                    Thoát
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    Xác nhận
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  className="bg-blue-800"
                  onClick={() => setIsUpdating(true)}
                >
                  Cập nhật
                </Button>
              )
            }
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}

export interface UserData {
  id: number;
  phone: string;
  address: string;
  email: string;
  name: string;
  gender: string;
  birthday: any;
  avatar: string;
}
