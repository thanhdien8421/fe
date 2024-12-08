import { z } from "zod";
import { UploadCVSchema } from "@/schema/UploadCVSchema";

// Helper function to delay with a Promise
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Make UploadCV an async function
export async function UploadCV(values: z.infer<typeof UploadCVSchema>) {
  // Wait for 2 seconds
  await delay(2000);

  // Log the values after the delay

  return {
    message: "Ứng tuyển thành công",
    success: true,
  };
}
