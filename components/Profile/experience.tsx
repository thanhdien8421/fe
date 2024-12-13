"use client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
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

export default function Experience({
  type,
  data,
  onCheck,
}: {
  type: string;
  data: RecordType;
  onCheck: (data: RecordType) => void;
}) {
  return (
    <Card className="drop-shadow-lg h-[300px] pb-2 bg-white rounded-xl border border-gray-200">
      <CardHeader className="flex flex-row border-b rounded-t-xl bg-gradient-to-r from-blue-500 to-blue-600 py-4">
        <p className="text-xl font-semibold text-white">Kinh nghiệm làm việc</p>
        <Button className="ml-auto hover:scale-105 transition-transform duration-200 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 w-8 h-8">
          <AddExperience data={data} onCheck={onCheck} />
        </Button>
      </CardHeader>
      <CardContent className="py-5 gap-1 h-3/4">
        {data.experience.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-gray-400 font-medium">Chưa có dữ liệu</h1>
          </div>
        ) : (
          <div className="flex flex-col overflow-y-auto gap-4 h-full pr-2">
            {data.experience.map((obj) => (
              <ExperienceCard
                obj={obj}
                type={type}
                data={data}
                key={obj.id}
                onCheck={onCheck}
              />
            ))}
          </div>
        )}
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

export const ExperienceCard: React.FC<ExperienceProps> = ({
  obj,
  type,
  data,
  onCheck,
}) => {
  const index = data.experience.findIndex((mem) => mem.id === obj.id);
  return (
    <div
      className={clsx(
        "flex flex-row w-full p-4 bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200 group",
        {
          hidden: index !== -1 && data.expCheck[index] === false && type === "preview",
          "": index !== -1 && data.expCheck[index] === true && type === "preview",
        }
      )}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="grid grid-cols-4 gap-4 w-full">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {obj.company}
          </h2>
          <h3 className="text-md font-medium text-gray-600">
            {obj.position}
          </h3>
          <p className="text-sm text-gray-500">
            {obj.description}
          </p>
          <div className="flex flex-col space-y-1">
            <p className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Bắt đầu:</span>
              <span className="font-medium">{formatDate(obj.startDate)}</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Kết thúc:</span>
              <span className="font-medium">{formatDate(obj.endDate)}</span>
            </p>
          </div>
        </div>
        {type === "profile" ? (
          <div className="flex flex-row gap-2 ml-4">
            <EditButton val={"/record"} />
            <TrashButton val={`records/${obj.id}`} />
          </div>
        ) : type === "preview" ? (
          <></>
        ) : (
          <Checkbox
            className="ml-4"
            onCheckedChange={() => {
              const newdata = JSON.parse(JSON.stringify(data));
              if (index !== -1) {
                newdata.expCheck[index] = !data.expCheck[index];
                onCheck(newdata);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

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
  onCheck: (data: RecordType) => void;
}

export function AddExperience({
  data,
  onCheck,
}: {
  data: RecordType;
  onCheck: (data: RecordType) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ExperienceSchema>>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      employeeId: 1,
      url: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ExperienceSchema>) {
    const apiUrl = `http://localhost:8000/api/v1/experiences`;

    values.employeeId = Number(localStorage.getItem("userId"));
    values.url = "abc.com";
    values.image = "net.jpg";

    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error("Error: " + data.error);
        } else {
          setOpen(false);
          return {
            message: data.message,
            success: true,
            data: data.data,
          };
        }
      })
      .catch((error) => ({
        message: error,
        success: false,
        data: null,
      }));

    if (result.success) {
      const newdata = JSON.parse(JSON.stringify(data));
      const newinfo: ExperienceAttr = {
        id: result.data.id,
        company: result.data.company,
        position: result.data.position,
        description: result.data.description,
        startDate: result.data.startDate,
        endDate: result.data.endDate,
      };
      newdata.experience.push(newinfo);
      newdata.expCheck.push(true);
      onCheck(newdata);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center w-5 h-5 rounded-full transition duration-200 ease-in-out cursor-pointer">
          <IoMdAdd className="text-4xl text-white hover:scale-110 transition-transform font-bold" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-semibold">
            Thêm kinh nghiệm làm việc
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Vui lòng điền đầy đủ thông tin bên dưới
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right font-medium">
                Công ty
              </Label>
              <Input
                {...form.register("company")}
                id="company"
                placeholder="Nhập tên công ty..."
                className="col-span-3 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right font-medium">
                Vị trí
              </Label>
              <Input
                {...form.register("position")}
                id="position"
                placeholder="Nhập vị trí công việc..."
                className="col-span-3 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right font-medium">
                Mô tả
              </Label>
              <Input
                {...form.register("description")}
                id="description"
                placeholder="Mô tả công việc..."
                className="col-span-3 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right font-medium">
                Ngày bắt đầu
              </Label>
              <Input
                {...form.register("startDate")}
                id="startDate"
                type="date"
                className="col-span-3 focus-visible:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right font-medium">
                Ngày kết thúc
              </Label>
              <Input
                {...form.register("endDate")}
                id="endDate"
                type="date"
                className="col-span-3 focus-visible:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="font-medium"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-medium"
            >
              Thêm mới
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}