"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IoCloseOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdDriveFileMove } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CgDanger } from "react-icons/cg";
import { UploadCVSchema } from "@/schema/UploadCVSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaCloudUploadAlt } from "react-icons/fa";
import { UploadCV } from "@/action/uploadCV";
import toast, { Toaster } from "react-hot-toast";
import RecordList from "../Profile/recordList";
interface UploadCVFormProps {
  id: string;
  title: string;
}

const Section = ({
  title,
  description,
  Icon,
  children,
}: {
  title: string;
  description?: string;
  Icon: IconType;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Icon className="text-cyan-600" size={24} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-gray-500 text-sm">{description}</p>
      {children}
    </div>
  );
};

export const UploadCVForm = ({ id, title }: UploadCVFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof UploadCVSchema>>({
    resolver: zodResolver(UploadCVSchema),

    defaultValues: {
      name: localStorage.getItem("userName") || "", // Nếu null thì thay bằng ""
      email: localStorage.getItem("userEmail") || "", // Tương tự cho email
      phone: localStorage.getItem("phone") || "", // Tương tự cho số điện thoại
      letter: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UploadCVSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const result = await UploadCV(values);
      if (result.success) {
        toast.success(result.message);
      } else toast.error("Đã xảy ra lỗi");
    });
  }
  return (
    <div>
      <Toaster />
      <button
        className="bg-[#00b14f] rounded-[7px] p-[7px] font-semibold text-white hover:bg-green-600"
        onClick={() => setHidden(false)}
        disabled={isPending}
      >
        Ứng tuyển ngay
      </button>
      {!hidden && (
        <div className="bg-gray-500 fixed w-screen h-screen bg-opacity-25 top-0 left-0 flex justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="w-full md:max-w-[40rem] mx-3">
                <CardHeader className="flex justify-between items-center border-b-[1px] flex-row shadow-sm">
                  <h3 className="text-xl font-bold">
                    Ứng tuyển <span className="text-cyan-600">{title}</span>
                  </h3>
                  <Button
                    onClick={() => setHidden(true)}
                    className="w-[50px] rounded-full h-[50px] bg-gray-100 hover:bg-gray-300"
                    type="button"
                    disabled={isPending}
                  >
                    <IoCloseOutline color="black" />
                  </Button>
                </CardHeader>
                <CardContent className="overflow-y-scroll h-[350px] px-7 py-5 flex flex-col gap-5">
                  <Section title="Chọn CV để ứng tuyển" Icon={MdDriveFileMove}>
                    <div className="w-full border-2 border-dotted py-3 px-5 space-y-3">
                      <div className="border-b-[1px] flex flex-col items-center justify-center min-h-[200px] gap-2">
                        <div className="flex items-center gap-3">
                          <FaCloudUploadAlt fontSize={24} />
                          <p>Tải lên CV từ máy tính, chọn hoặc kéo thả</p>
                        </div>

                        <p className="text-gray-500">
                          Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới
                          5MB
                        </p>
                        <div className="flex gap-3 items-center flex-wrap">
                          <Button
                            variant={"secondary"}
                            type="button"
                            disabled={isPending}
                          >
                            <label htmlFor="upload-photo">Chọn CV</label>
                          </Button>
                          <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="file"
                                    id="upload-photo"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null;
                                      form.setValue("file", file); // Set the file in form state
                                      if (file) setFileName(file.name);
                                    }}
                                    className="hidden"
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <p>{fileName}</p>
                        </div>
                      </div>
                      <p className="text-cyan-700">
                        Vui lòng nhập thông tin chi tiết
                      </p>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="shadcn"
                                {...field}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid md:grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="shadcn"
                                  {...field}
                                  disabled={isPending}
                                />
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
                                <Input
                                  placeholder="shadcn"
                                  {...field}
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </Section>
                  <Section
                    title="Thư giới thiệu"
                    Icon={SlEnvolopeLetter}
                    description="Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng."
                  >
                    <FormField
                      control={form.control}
                      name="letter"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="shadcn"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="border-[1px] min-h-[200px] p-3">
                      <div className="text-red-500 font-semibold flex gap-2 items-center">
                        <CgDanger />
                        <p>Lưu ý:</p>
                      </div>
                      <ol className="mt-3">
                        <li>
                          1. Chúng tôi khuyên tất cả các bạn hãy luôn cẩn trọng
                          trong quá trình tìm việc và chủ động nghiên cứu về
                          thông tin công ty, vị trí việc làm trước khi ứng
                          tuyển. Ứng viên cần có trách nhiệm với hành vi ứng
                          tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc
                          nhận được liên lạc đáng ngờ của nhà tuyển dụng, hãy
                          báo cáo ngay cho chúng tôi qua email hotro@gmail.com
                          để được hỗ trợ kịp thời.
                        </li>
                        <li>
                          2. Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo{" "}
                          <a href="/" className="hover:underline text-cyan-600">
                            tại đây
                          </a>
                          .
                        </li>
                      </ol>
                    </div>
                  </Section>
                </CardContent>

                <CardFooter className="py-5 px-7 flex gap-3 border-t-[1px] shadow-lg">
                  <Button
                    className="min-w-[100px]"
                    onClick={() => setHidden(true)}
                    type="button"
                    disabled={isPending}
                  >
                    Hủy
                  </Button>
                  <Button
                    className="shink-1 bg-cyan-600 hover:bg-cyan-500 grow"
                    type="submit"
                    disabled={isPending}
                  >
                    Nộp hồ sơ ứng tuyển
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export function UploadYourCV({id} : {id : string}) {
  const [isPending, startTransition] = useTransition();
  const [hidden, setHidden] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof UploadCVSchema>>({
    resolver: zodResolver(UploadCVSchema),

    defaultValues: {
      name: localStorage.getItem("userName") || "", // Nếu null thì thay bằng ""
      email: localStorage.getItem("userEmail") || "", // Tương tự cho email
      phone: localStorage.getItem("phone") || "", // Tương tự cho số điện thoại
      letter: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UploadCVSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const result = await UploadCV(values);
      if (result.success) {
        toast.success(result.message);
      } else toast.error("Đã xảy ra lỗi");
    });
  }
  return (
    <div>
    <Toaster />
    <button
      className="bg-[#00b14f] rounded-[7px] p-[7px] font-semibold text-white hover:bg-green-600"
      onClick={() => setHidden(false)}
      disabled={isPending}
    >
      Ứng tuyển ngay
    </button>
    {!hidden && (
      <div className="bg-gray-500 fixed w-screen h-screen bg-opacity-25 top-0 left-0 flex justify-center items-center">
        <RecordList/>
      </div>
    )}
  </div>
  )
}