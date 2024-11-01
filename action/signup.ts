import { z } from "zod";
import { SignupSchema } from "@/schema/SignupSchema";

// Helper function to delay with a Promise
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Make UploadCV an async function
export async function SignUp(values: z.infer<typeof SignupSchema>) {
  // Wait for 2 seconds
  await delay(2000);

  // Log the values after the delay
  console.log(values);

  return {
    message: "Đăng ký thành công",
    success: true,
  };
}