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

export default function Certificate({type, getData} : {type : string, getData : RecordType}) {
  const [data, setData] = React.useState<CertificateAttr[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/certificates/employee/1`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      setError("Lỗi");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [currentPage]); // Chạy lại khi currentPage hoặc pageSize thay đổi

  const AddPostButton: React.FC = () => {
    return (
      <div className="flex items-center justify-center ">
        <AddCertificate />
      </div>
    );
  };

  return (
    <Card className="drop-shadow-sm h-[400px] pb-2">
      <CardHeader className="flex flex-row border-b-2 rounded-t-lg bg-[#4A628A]">
        <p className="text-lg font-semibold text-gray-800">Chứng chỉ</p>
        {type == "profile" ?
        <div className="ml-auto pr-[15px]">
          <AddPostButton />
        </div> : <></>
        }
      </CardHeader>
      <CardContent className="my-5 gap-1 h-3/4">
        <div className="flex flex-col overflow-y-auto gap-4 h-full">
          {data.map((obj) => {
            return (
              <CertificateCard obj={obj} type={type} getData={getData} key={obj.id} />
            )
          }
          )}
        </div>
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

export const CertificateCard: React.FC<CertificateProps> = ({ obj, type, getData }) => {
  return (
    <div className="flex flex-row w-full gap-10 p-3 bg-white border border-gray-200 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-row justify-between gap-10">
        <div className="grid grid-cols-5 col-span-10 gap-3 justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{obj.name}</h2>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Tổ chức: {obj.organization}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Ngày cấp: <span className="font-medium">{formatDate(obj.verifiedDate)}</span></p>
          </div>
        </div>
        { type == "profile" ? 
          (
          <div className="flex flex-row gap-2">
          <EditButton val={'/record'} />
          <TrashButton val={`records/${obj.id}`} />
          </div>
          ) : ( type == "preview" ? <></> : <Checkbox onClick={() => {getData.certificate.push(obj.id)} }/>)
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
  getData: RecordType;
}

export function AddCertificate() {
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

    values.employeeId = 1;
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
        <button>
          <div className="flex items-center justify-center w-5 h-5 text-gray-700 rounded-full transition duration-200 ease-in-out cursor-pointer">
            <IoMdAdd className="text-2xl" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm bằng cấp</DialogTitle>
          <DialogDescription>
            Nhập thông tin mà bạn muốn thêm vào
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VSTEP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chuyên ngành</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="IIG"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="verifiedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chi tiết</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ngày cấp"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
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