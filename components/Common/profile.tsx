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
      const result = await FirstUpdateProfile(values);
      if (result.success) {
        toast.success(result.message);
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
    <div className="flex items-start gap-3">
      <div><Toaster /></div>
      <Form {...form}>
        <Card className="drop-shadow-lg">
          <CardHeader className="w-[350px]">
            <CardTitle className="text-3xl font-bold">Cài đặt thông tin cá nhân</CardTitle>
            <CardDescription>
              Các thông tin bắt buộc
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
                      <Input {...field} placeholder = "" disabled={isPending} />
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
            <p className="max-w-[300px]">
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
    </div>
  );
}

async function FirstUpdateProfile(values: z.infer<typeof ProfileUpdateSchema>) {
  const data = {
    phone: values.phone,
    address: values.address,
    gender: values.gender,
    age: values.age
  };

  console.log(JSON.stringify(data));

  const apiUrl = `http://localhost:8000/api/v1/employees/${localStorage.getItem("userId")}`;

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