import { z } from "zod";
import { LoginSchema } from "@/schema/LoginSchema";

// Helper function to delay with a Promise
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Make UploadCV an async function
export async function Login(values: z.infer<typeof LoginSchema>) {
  // Wait for 2 seconds
  await delay(2000);

  // Log the values after the delay
  console.log(values);

  return {
    message: "Đăng nhập thành công",
    success: true,
  };
}