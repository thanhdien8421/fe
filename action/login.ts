import { z } from "zod";
import { LoginSchema } from "@/schema/LoginSchema";

// Helper function to delay with a Promise
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Make UploadCV an async function
export async function Login(values: z.infer<typeof LoginSchema>) {
  // Wait for 2 seconds

  // Log the values after the delay
  const url = "http://localhost:8000/api/v1/auth/login";
  const data = {
    username: values.email,
    password: values.password,
    type: values.role,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    if (result?.response?.error) {
      throw new Error(result?.response?.error);
    }

    return {
      message: "Đăng nhập thành công",
      success: true,
      user: result?.data?.user,
    };
  } catch (error) {
    return {
      message: "Tài khoản hoặc mât khẩu không chính xác",
      success: false,
      user: null,
    };
  }
}
