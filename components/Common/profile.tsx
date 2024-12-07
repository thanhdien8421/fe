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
import { SwitchForm } from "./toggle-follow";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdateSchema } from "@/schema/ProfileSchema";
import { useForm } from "react-hook-form";

export function ProfileUpdate() {
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [nameUser, setNameUser] = React.useState("");
  const role = useSearchParams().get("role");
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      email: "a@gmail.com",
      password: " ",
      phone: "",
      address: "",
      name: "",
      gender: "",
      age: 18,
    },
  });

  function onSubmit(values: z.infer<typeof ProfileUpdateSchema>) {
    startTransition(async () => {
      const result = await FirstUpdateProfile(values);
      if ((result.success == true) == true) {
        toast.success("Cập nhật thành công. Quay về trang đăng nhập.");
        router.push("/login");
      } else toast.error("Đã xảy ra lỗi");
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
    <div>
      <Toaster />
      <div className="w-screen flex flex-row">
        <div className="w-1/3 flex justify-center">
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
                  <p className="font-bold">{nameUser}</p>
                  <div className="bg-gray-600 text-[10px] text-white text-center py-1 px-1">
                    Ứng viên
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="max-w-[300px] text-justify">
                Chỉ cần một vài bước nữa thôi là bạn sẽ có thể tìm kiếm công
                việc ngay lập tức cùng <b>JobCenter</b>!
              </p>
              <p className="max-w-[300px] text-justify">
                Hãy hoàn thành bằng cách điền vào biểu mẫu bên cạnh.
              </p>
            </CardFooter>
          </Card>
        </div>
        <Form {...form}>
          <Card className="drop-shadow-lg w-1/3">
            <CardHeader className="w-full">
              <CardTitle className="text-3xl font-bold pb-5">
                Cập nhật thông tin cá nhân
              </CardTitle>
              <CardDescription className="w-2/3">
                Những thông tin cần thiết để chúng tôi và <br></br> nhà tuyển
                dụng biết bạn là ai
              </CardDescription>
            </CardHeader>
            <CardContent className="font-sans">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <b>Số điện thoại</b>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0xxxxxxxxx"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>
                        Số điện thoại chính dùng để liên hệ
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
                      <FormLabel>
                        <b>Địa chỉ</b>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123 Đồng Khởi, Q.1, Tp.HCM"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>
                        Địa chỉ thường trú hoặc nơi ở hiện tại
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
                      <FormLabel>
                        <b>Tuổi</b>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          name="quantity"
                          min="18"
                          max="150"
                          placeholder="18"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <b>Giới tính</b>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-blue-800"
                >
                  Cập nhật
                </Button>
              </form>
            </CardContent>
          </Card>
        </Form>
        <div className="w-1/3"></div>
      </div>
    </div>
  );
}

async function FirstUpdateProfile(values: z.infer<typeof ProfileUpdateSchema>) {
  const data = {
    phone: values.phone,
    address: values.address,
    gender: values.gender,
    age: values.age,
  };

  console.log(JSON.stringify(data));

  const apiUrl = `http://localhost:8000/api/v1/employees/${localStorage.getItem(
    "userId"
  )}`;

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
