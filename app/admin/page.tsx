"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SwitchStatusBtn from "@/components/Switch/switchBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} ngày ${date.getDate()} tháng ${
    date.getMonth() + 1
  } năm ${date.getFullYear()}`;
}

// Interface for form data
interface FormData {
  minRating: string;
  minApplications: string;
  industry: string;
}

const RecruitmentedList = ({ params }: { params: { id: string } }) => {
  const formSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    address: z.string().min(2).max(50).optional(),
    phone: z.string().min(2).max(50).optional(),
    birthday: z.string().min(2).max(50).optional(),
    gender: z.string().optional(),
    email: z.string().min(2).max(50).optional(),
  });

  const [password, setPassword] = useState("123456");
  const [editingItem, setEditingItem] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editingItem?.name || "",
      email: editingItem?.email || "",
      address: editingItem?.address || "",
      phone: editingItem?.phone || "",
      birthday: editingItem?.birthday || "",
      gender: editingItem?.gender || "",
    },
  });

  const router = useRouter();
  const [jobData, setJobData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchJobData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/employees`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.data);
      setJobData(data.data);
    } catch {
      setError("Lỗi: Không tìm thấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await fetch(`http://localhost:8000/api/v1/employees/${id}`, {
        method: "DELETE",
      });
      await fetchJobData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      email: item.email,
      address: item.address,
      phone: item.phone,
      birthday: item.birthday,
      gender: item.gender,
    });
  };

  const handleAdd = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await fetch(`http://localhost:8000/api/v1/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          password: password,
        }),
      });
      await fetchJobData();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>, id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/employees/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      await fetchJobData();
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  if (loading) {
    return (
      <div className="loader h-screen flex flex-col items-center justify-center">
        <div className="spinner w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center mx-5">
      <p className="m-8 text-xl text-center mb-[40px] font-bold">
        Danh sách tài khoản Employee trong hệ thống
      </p>
      <div className="flex justify-center">
        <Dialog>
          {/* <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              <Plus />
              Thêm người dùng
            </Button>
          </DialogTrigger> */}
          <DialogContent>
            {/* <DialogHeader>
              <DialogTitle>Thêm người dùng</DialogTitle>
            </DialogHeader> */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit((values) => handleAdd(values))}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
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
                        <Input {...field} />
                      </FormControl>
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
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày sinh</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giới tính</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nam">Nam</SelectItem>
                            <SelectItem value="Nữ">Nữ</SelectItem>
                            <SelectItem value="Khác">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2 mt-5">
                  <Label>Mật khẩu</Label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" className="mt-5">
                  Thêm
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="min-h-[650px] mt-14">
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="text-center text-base text-gray-600">
                <TableHead className="w-[5%] text-center font-bold">
                  STT
                </TableHead>
                <TableHead className="w-[15%] text-center font-bold">
                  Email
                </TableHead>
                <TableHead className="w-[15%] text-center font-bold">
                  Tên
                </TableHead>
                <TableHead className="w-[10%] text-center font-bold">
                  Số điện thoại
                </TableHead>
                <TableHead className="w-[15%] text-center font-bold">
                  Địa chỉ
                </TableHead>
                <TableHead className="w-[10%] text-center font-bold">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobData.map((item, index) => (
                <TableRow
                  key={index}
                  className="text-center text-base text-gray-700"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="text-center">{item.email}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.phone}</TableCell>
                  <TableCell className="text-center">{item.address}</TableCell>
                  <TableCell className="flex justify-center gap-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Xóa
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button type="button" onClick={() => handleEdit(item)}>
                          Sửa
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Sửa thông tin cá nhân</DialogTitle>
                          <DialogDescription>
                            Sửa thông tin cá nhân của {editingItem?.name}
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit((values) =>
                              onSubmit(values, editingItem.id)
                            )}
                            className="space-y-4"
                          >
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Họ và tên</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
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
                                    <Input {...field} />
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
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="birthday"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ngày sinh</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
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
                                  <FormLabel>Giới tính</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Chọn giới tính" />
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
                            <DialogFooter>
                              <Button type="submit">Lưu thay đổi</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentedList;
