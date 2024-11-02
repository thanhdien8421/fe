"use client"
import * as React from "react"

import { FaCamera } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { SwitchForm } from "./toggle-follow"
import { useSearchParams } from 'next/navigation'

export function Profile() {
  const role = useSearchParams().get("role")
  return (
    <div className="flex items-start gap-3 flex-wrap justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Cài đặt thông tin cá nhân</CardTitle>
          <CardDescription>Các thông tin bắt buộc.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" placeholder="Đoàn Trí Hùng" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" placeholder="0394529624" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="hello@gmail.com" disabled />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="min-w-[100px]">Lưu</Button>
        </CardFooter>
      </Card>
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
              <p>Chào bạn đã trở lại</p>
              <p className="font-bold">D HUNG</p>
              <div className="bg-gray-600 text-[10px] text-white text-center py-1">{role == "1" ? "Ứng viên" : "Nhà tuyển dụng"} </div>
            </div>
          </div>

        </CardContent>
        <CardFooter>
          {role === "1" ? <SwitchForm /> : ""}
        </CardFooter>
      </Card>
    </div>
  )
}
