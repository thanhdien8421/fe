import { z } from "zod";
import { UploadCVSchema } from "@/schema/UploadCVSchema";

// Make UploadCV an async function
export async function UploadCV(values: z.infer<typeof UploadCVSchema>) {
  const apiUrl = "http://localhost:8000/api/v1/record";

  return await fetch(apiUrl, {
    method: "POST", // Phương thức POST
    headers: {
      "Content-Type": "application/json", // Định dạng dữ liệu gửi
    },
    body: JSON.stringify(values), // Chuyển đổi dữ liệu thành chuỗi JSON
  })
    .then((response) => {
      return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then((data) => {
      console.log("Data received:", data); // Xử lý dữ liệu nhận được
      if (data.error) {
          throw new Error("Email đã tồn tại");
      } else {
        return {
          message: data.message,
          success: true,
          data: data.data[0]
        };
      }
    })
    .catch((error) => {
      return {
        message: error,
        success: false,
        data: null
      };
    });
}
