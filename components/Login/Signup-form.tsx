"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema } from "@/schema/LoginSchema"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTransition } from "react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle
} from "../ui/card"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { SignUp } from "@/action/signup"
import { SignupSchema } from "@/schema/SignupSchema"

export function SignupForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  })
  const [isPending, startTransition] = useTransition()

  async function fakeSubmit(values: any) {
    return new Promise((resolve) => setTimeout(() => resolve(values), 2000));
  }

  function onSubmit(values: z.infer<typeof SignupSchema>) {
    startTransition(async () => {
      const result = await SignUp(values);
      if (result.success) {
        toast.success(result.message)
        if (values.email == "employee@gmail.com") router.push('/job')
        else if (values.email == "employer@gmail.com") router.push('/')
      }
      else toast.error("Đã xảy ra lỗi")
    });
  }
  return (
    <Form {...form}>
      <div><Toaster /></div>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Đăng ký tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" {...field} disabled={isPending} />
                  </FormControl>
                  <FormDescription>
                    Mật khẩu có độ dài 8 - 16 ký tự
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="bg-blue-800">Đăng ký</Button>
          </form>
        </CardContent>
        <CardFooter>
          Chưa có tài khoản? Đăng ký ngay tại<pre> </pre><Link href={"/signup"}><u className="text-sky-700">Sign Up</u></Link>
        </CardFooter>
      </Card>
    </Form>
  )
}

