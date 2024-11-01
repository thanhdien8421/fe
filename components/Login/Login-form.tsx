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
import toast, {Toaster} from "react-hot-toast"
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

export function LoginForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<any>()
  
  console.log("---Re-Render")
  async function fakeSubmit(values : any) {
    return new Promise((resolve) => setTimeout(() => resolve(values), 2000));
  }
  
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const result = await fakeSubmit(values);
      setData(result)
      if (result) {
        toast.success("Đăng nhập thành công.")
        router.push("/job")
      }
      else toast.error("Đã xảy ra lỗi")
    });
  }
    return (
    <Form {...form}>
      <div><Toaster/></div>
      <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Log In</CardTitle>
            <CardDescription>
              Hãy nhập thông tin đăng nhập của bạn.
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
                <Input placeholder="example@email.com" {...field} disabled={isPending}/>
              </FormControl>
              <FormDescription>
                Địa chỉ email
              </FormDescription>
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
                <Input placeholder="••••••••" {...field} disabled={isPending}/>
              </FormControl>
              <FormDescription>
                Mật khẩu có độ dài 8 - 16 ký tự
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="bg-blue-800">Đăng nhập</Button>
      </form>
      </CardContent>
      <CardFooter>
        Chưa có tài khoản? Đăng ký ngay tại<pre> </pre><Link href={"/signup"}><u className="text-sky-700">Sign Up</u></Link>
      </CardFooter>
      </Card>
    </Form>
  )
}

