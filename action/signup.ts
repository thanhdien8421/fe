import { z } from "zod";
import { SignupSchema } from "@/schema/SignupSchema";

// Helper function to delay with a Promise
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPostData(url: string, data: any) {}
// Make UploadCV an async function
export async function SignUp(values: z.infer<typeof SignupSchema>) {
  const data = {
    email: values.email,
    password: values.password,
    name: values.name,
    avatar: "https://github.com/shadcn.png",
  };
  const apiUrl = "http://localhost:8000/api/v1/employees";

  return await fetch(apiUrl, {
    method: "POST", // Phương thức POST
    headers: {
      "Content-Type": "application/json", // Định dạng dữ liệu gửi
    },
    body: JSON.stringify(data), // Chuyển đổi dữ liệu thành chuỗi JSON
  })
    .then((response) => {
      return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then((data) => {
      if (data.error) {
        throw new Error("Error: " + data.error);
      } else {
        return {
          message: data.message,
          success: true,
          data: data.data[0],
        };
      }
      // Xử lý dữ liệu nhận được
    })
    .catch((error) => {
      return {
        message: error,
        success: false,
        data: null,
      };
    });
  // Thực hiện yêu cầu POST

  // Log the values after the delay
}
