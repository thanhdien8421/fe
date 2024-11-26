import { z } from "zod";
import { SignupSchema } from "@/schema/SignupSchema";

export async function SignUp(values: z.infer<typeof SignupSchema>) {
  const data = {
    email: values.email,
    password: values.password,
    name: values.name,
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
      console.log("Data received:", data); // Xử lý dữ liệu nhận được
      if (data.error) {
        if (data.message === "Email đã tồn tại") {
          throw new Error("Email đã tồn tại");
        } else throw new Error("Lỗi hệ thống");
      } else {
        return {
          message: data.message,
          success: true,
          data: data.data[0],
          type:""
        };
      }
    })
    .catch((error) => {
      let errorType = "Lỗi hệ thống"
      if (error.message == "Email đã tồn tại") errorType = "Email đã tồn tại";
      
      return {
        message: error,
        success: false,
        data: null,
        type: errorType
      };
    });
}
