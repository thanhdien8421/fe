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
import { CertificateSchema } from "@/schema/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import EditButton from "../ui/edit";
import TrashButton from "../ui/trash";
import { Checkbox } from "../ui/checkbox";
import { RecordType } from "@/app/record/page";
import clsx from "clsx";
import type { z } from "zod";

export default function Certificate({
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
      <CardHeader className="flex flex-row border-b rounded-t-xl bg-gradient-to-r from-green-500 to-orange-600 py-4">
        <p className="text-xl font-semibold text-white">Bằng cấp, chứng chỉ</p>
        <Button className="ml-auto hover:scale-105 transition-transform duration-200 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 w-8 h-8">
          <AddCertificate data={data} onCheck={onCheck} />
        </Button>
      </CardHeader>
      <CardContent className="py-5 gap-1 h-3/4">
        {data.certificate.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-gray-400 font-medium">Chưa có dữ liệu</h1>
          </div>
        ) : (
          <div className="flex flex-col overflow-y-auto gap-4 h-full pr-2">
            {data.certificate.map((obj) => (
              <CertificateCard
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

export const CertificateCard: React.FC<CertificateProps> = ({
  obj,
  type,
  data,
  onCheck,
}) => {
  const index = data.certificate.findIndex((mem) => mem.id === obj.id);
  return (
    <div
      className={clsx(
        "flex flex-row w-full gap-4 p-4 bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-200 group",
        {
          hidden:
            index !== -1 && data.cerCheck[index] === false && type === "preview",
          "":
            index !== -1 && data.cerCheck[index] === true && type === "preview",
        }
      )}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="grid grid-cols-3 gap-4 w-full">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
            {obj.name}
          </h2>
          <h3 className="text-md font-medium text-gray-600">
            Tổ chức: {obj.organization}
          </h3>
          <div className="text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <span className="text-gray-400">Ngày cấp:</span>
              <span className="font-medium">{formatDate(obj.verifiedDate)}</span>
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
                newdata.cerCheck[index] = !data.cerCheck[index];
                onCheck(newdata);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export interface CertificateAttr {
  id: number;
  name: string;
  organization: string;
  verifiedDate: string;
}

interface CertificateProps {
  obj: CertificateAttr;
  type: string;
  data: RecordType;
  onCheck: (data: RecordType) => void;
}

export function AddCertificate({
  data,
  onCheck,
}: {
  data: RecordType;
  onCheck: (data: RecordType) => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof CertificateSchema>>({
    resolver: zodResolver(CertificateSchema),
    defaultValues: {
      name: "IELTS",
      organization: "IDP",
      verifiedDate: "1/1/2020",
      employeeId: 1,
      url: "abc.com",
      image: "net.jpg",
    },
  });

  async function onSubmit(values: z.infer<typeof CertificateSchema>) {
    const apiUrl = `http://localhost:8000/api/v1/certificates`;

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
      const newinfo: CertificateAttr = {
        id: result.data.id,
        name: result.data.name,
        organization: result.data.organization,
        verifiedDate: result.data.verifiedDate,
      };
      newdata.certificate.push(newinfo);
      newdata.cerCheck.push(true);
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
          <DialogTitle className="text-2xl font-semibold">Thêm bằng cấp</DialogTitle>
          <DialogDescription className="text-gray-500">
            Vui lòng điền đầy đủ thông tin bên dưới
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-medium">
                Tên gọi
              </Label>
              <Input
                {...form.register("name")}
                id="name"
                placeholder="TOEIC/IELTS/TOEFL..."
                className="col-span-3 focus-visible:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organization" className="text-right font-medium">
                Tổ chức
              </Label>
              <Input
                {...form.register("organization")}
                id="organization"
                placeholder="Nhập tổ chức..."
                className="col-span-3 focus-visible:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="verifiedDate" className="text-right font-medium">
                Ngày cấp
              </Label>
              <Input
                {...form.register("verifiedDate")}
                id="verifiedDate"
                type="date"
                className="col-span-3 focus-visible:ring-green-500"
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
              className="bg-green-600 hover:bg-green-700 font-medium"
            >
              Thêm mới
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
