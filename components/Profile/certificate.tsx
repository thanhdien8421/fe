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
import { CertificateSchema } from "@/schema/ProfileSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import EditButton from "../ui/edit";
import TrashButton from "../ui/trash";
import { Checkbox } from "../ui/checkbox";
import { RecordType } from "@/app/record/page";
import clsx from "clsx";

export default function Certificate({ type, data, onCheck }: { type: string, data: RecordType, onCheck: (data: RecordType) => void }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const AddPostButton: React.FC = () => {
    return (
      <div className="flex items-center justify-center">
        
      </div>
    );
  };

  return (
    <Card className="drop-shadow-sm h-[300px] pb-2 bg-gray-50">
      <CardHeader className="flex flex-row border-b-2 rounded-t-lg bg-[#4A628A]">
        <p className="text-xl font-semibold text-gray-800">Bằng cấp, chứng chỉ</p>
          <Button className="ml-auto pr-[15px] bg-transparent hover:bg-yellow-200 border-2 border-yellow-200 flex flex-col item-start w-8 h-8">
            <AddCertificate data={data} onCheck={onCheck}/>
          </Button>
      </CardHeader>
      <CardContent className="py-5 gap-1 h-3/4">
        {(data.certificate.length == 0) ?
          <h1 className="w-full h-full text-center p-20 text-gray-500">
            Chưa có dữ liệu
          </h1>
          :
          <div className="flex flex-col overflow-y-auto gap-4 h-full">
            {data.certificate.map((obj) => {
              return (
                <CertificateCard obj={obj} type={type} data={data} key={obj.id} onCheck={onCheck} />
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

export const CertificateCard: React.FC<CertificateProps> = ({ obj, type, data, onCheck }) => {
  const index = data.certificate.findIndex((mem) => (mem.id == obj.id))
  return (
    <div className={clsx("flex flex-row w-full gap-10 p-3 bg-white border border-gray-200 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
      { "hidden": index != -1 && data.cerCheck[index] === false && type === "preview", "": index != -1 && data.cerCheck[index] === true && type === "preview" },)}>
      <div className="flex flex-row justify-between gap-10">
        <div className="grid grid-cols-5 col-span-10 gap-3 justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{obj.name}</h2>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Tổ chức: {obj.organization}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Ngày cấp: <span className="font-medium">{formatDate(obj.verifiedDate)}</span></p>
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
                newdata.cerCheck[index] = !data.cerCheck[index];
                onCheck(newdata);
              }
            }} />)
        }
      </div>
    </div>
  )
}

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
  onCheck: (data: RecordType) => void
}

export function AddCertificate({data, onCheck} : {data: RecordType, onCheck: (data : RecordType) => void}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof CertificateSchema>>({
    resolver: zodResolver(CertificateSchema),
    defaultValues: {
      name: "IELTS",
      organization: "IDP",
      verifiedDate: "1/1/2020",
      employeeId: 1,
      url: "abc.com",
      image: "net.jpg"
    }
  })

  async function onSubmit(values: z.infer<typeof CertificateSchema>) {
    const apiUrl = `http://localhost:8000/api/v1/certificates`

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
            data: data.data,
          };
        }
      })
      .catch((error) => {
        return {
          message: error,
          success: false,
          data: null,
        };
      })

      if (result.success) {
        const newdata = JSON.parse(JSON.stringify(data));
        const newinfo : CertificateAttr = {
          id: result.data.id,
          name: result.data.name,
          organization: result.data.organization,
          verifiedDate: result.data.verifiedDate
        }
        newdata.certificate.push(newinfo); 
        newdata.cerCheck.push(true);
        onCheck(newdata);
      }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <div className="flex items-center justify-center w-5 h-5 rounded-full transition duration-200 ease-in-out cursor-pointer">
            <IoMdAdd className="text-4xl text-yellow-400 text-bold" />
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm bằng cấp</DialogTitle>
          <DialogDescription>
            Nhập thông tin mà bạn muốn thêm vào
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên gọi
            </Label>
            <Input
              {...form.register("name")}
              id="name"
              placeholder="TOEIC/IELTS/TOEFL..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organization" className="text-right">
              Tổ chức
            </Label>
            <Input
              {...form.register("organization")}
              id="organization"
              defaultValue="British Council/IDP/IIG..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="verifiedDate" className="text-right">
              Ngày cấp
            </Label>
            <Input
              {...form.register("verifiedDate")}
              id="verifiedDate"
              type="date"
              placeholder="dd/mm/yyyy"
              className="col-span-3"
            />
          </div>
        </div>
          <Button type="submit" className="bg-blue-800">
              Thêm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

async function Edit(data: CertificateAttr) {
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

async function Delete(data: CertificateAttr) {
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