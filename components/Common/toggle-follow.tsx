"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
  find_job: z.boolean().default(false).optional(),
  allow_view: z.boolean().default(true).optional(),
});

export function SwitchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="find_job"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-3 max-w-md w-full">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {field.value ? "Đang mở tìm việc" : "Đang tắt tìm việc"}
                    </FormLabel>
                    <FormDescription>
                      {field.value ? "Hồ sơ của bạn hiện đang ở chế độ tìm việc, giúp bạn dễ dàng tiếp cận các cơ hội tốt hơn và được nhà tuyển dụng ưu tiên trong kết quả tìm kiếm." : "Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trong danh sách tìm kiếm của NTD."}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allow_view"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-3 max-w-md w-full">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {field.value ? "Cho phép NTD tìm kiếm hồ sơ" : "Chưa cho phép NTD tìm kiếm hồ sơ"}
                    </FormLabel>
                    <FormDescription>
                      {field.value ? (
                        <div>
                          <p>Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn qua: </p>
                          <ul className="list-disc pl-5">
                            <li key={0}>Nhắn tin qua Zalo</li>
                            <li key={1}>NEmail và Số điện thoại của bạn</li>
                          </ul>
                        </div>
                      ) : "Khi bạn cho phép, các NTD uy tín có thể chủ động kết nối và gửi đến bạn những cơ hội việc làm hấp dẫn nhất, giúp nhân đôi hiệu quả tìm việc."}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}