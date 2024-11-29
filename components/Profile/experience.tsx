"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ExperienceSchema } from "@/schema/ProfileSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import EditButton from "../ui/edit";
import TrashButton from "../ui/trash";
import { Checkbox } from "../ui/checkbox";
import { RecordType } from "@/app/record/page";
import clsx from "clsx";

export default function Experience({ type, data, onCheck }: { type: string, data: RecordType, onCheck: (data: RecordType) => void }) {
  // const [data, setData] = React.useState<ExperienceAttr[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  return (
    <Card className="drop-shadow-sm h-[300px] pb-2 bg-gray-50">
      <CardHeader className="flex flex-row border-b-2 rounded-t-lg bg-[#7AB2D3]">
        <p className="text-lg font-semibold text-gray-800">Experience</p>
        <Button className="ml-auto pr-[15px] bg-orange-500 border-2 border-white flex flex-col item-start w-8 h-8">
          {/* <AddExperience /> */}
        </Button>
      </CardHeader>
      <CardContent className="py-5 gap-1 h-3/4 bg-gray-50">
        {(data.experience.length == 0) ?
          <h1 className="w-full h-full text-center p-20 text-gray-500">
            Chưa có dữ liệu
          </h1>
          :
          <div className="flex flex-col overflow-y-auto gap-4 h-full">
            {data.experience.map((obj) => {
              return (
                <ExperienceCard obj={obj} type={type} data={data} key={obj.id} onCheck={onCheck} />
              )
            }
            )}
          </div>
        }
      </CardContent>
    </Card>
  );
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const ExperienceCard: React.FC<ExperienceProps> = ({ obj, type, data, onCheck }) => {
  const index = data.experience.findIndex((mem) => (mem.id == obj.id))
  return (
    <div className={clsx("flex flex-row w-full gap-10 p-3 bg-white border border-gray-200 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
      { "hidden": index != -1 && data.expCheck[index] === false && type === "preview", "": index != -1 && data.expCheck[index] === true && type === "preview" },)}>
      <div className="flex flex-row justify-between">
        <div className="grid grid-cols-5 gap-3 justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{obj.company}</h2>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{obj.position}</h3>
          <p className="text-gray-600 dark:text-gray-400">{obj.description}</p>
          <div className="flex flex-row gap-10 text-sm text-gray-500 dark:text-gray-400 text-start">
            <p>Bắt đầu: <span className="font-medium">{formatDate(obj.startDate)}</span></p>
          </div>
          <div className="flex flex-row gap-10 text-sm text-gray-500 dark:text-gray-400 text-start">
            <p>Kết thúc: <span className="font-medium">{formatDate(obj.endDate)}</span></p>
          </div>
        </div>
        {type == "profile" ?
          (
            <div className="flex flex-row gap-2">
              <EditButton val={'/record'} />
              <TrashButton val={`records/${obj.id}`} />
            </div>
          ) : (type == "preview" ? <></> :
            <Checkbox onCheckedChange={() => {
              let newdata = JSON.parse(JSON.stringify(data))
              if (index !== -1) {
                newdata.expCheck[index] = !data.expCheck[index];
                onCheck(newdata);
              }
            }} />)
        }
      </div>
    </div>
  )
}

export interface ExperienceAttr {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface ExperienceProps {
  obj: ExperienceAttr;
  type: string;
  data: RecordType;
  onCheck: (data: RecordType) => void
}


export function AddExperience(onCheck : RecordType) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ExperienceSchema>>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      company: "LNG",
      position: "Trưởng phòng",
      description: "abcd",
      startDate: "1/1/2000",
      endDate: "1/1/2004",
      employeeId: 1,
      url: "abc.com",
      image: "net.jpg"
    }
  })

  async function onSubmit(values: z.infer<typeof ExperienceSchema>) {
    const apiUrl = `http://localhost:8000/api/v1/experiences`

    values.employeeId = Number(localStorage.getItem("userId"));
    values.url = "abc.com";
    values.image = "net.jpg";

    return await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.error) {
          throw new Error("Error: " + data.error);
        } else {
          setOpen(false);

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
      }
        // if (result.success) {
        //     toast.success(result.message);
        //     router.push("/login");
        // } else toast.error("Đã xảy ra lỗi");
      );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <div className="flex items-center justify-center w-5 h-5 rounded-full transition duration-200 ease-in-out cursor-pointer">
            <IoMdAdd className="text-4xl text-white" />
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm education</DialogTitle>
          <DialogDescription>
            Nhập thông tin mà bạn muốn thêm vào
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Công ty</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="AAA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Quản lý"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chi tiết</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mô tả"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1/1/2020"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1/1/2024"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-800">
              Thêm
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

async function Edit(data: ExperienceAttr) {
  const apiUrl = `http://localhost:8000/api/v1/education`

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

async function Delete(data: ExperienceAttr) {
  const apiUrl = `http://localhost:8000/api/v1/education`

  return await fetch(apiUrl, {
    method: "DELETE",
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
