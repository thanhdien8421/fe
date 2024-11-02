import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(4, { message: "Mật khẩu cần dài ít nhất 4 ký tự." }),
    confirmPassword: z
      .string()
      .min(4, { message: "Mật khẩu cần dài ít nhất 4 ký tự." }),
    role: z
      .string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"], // This points to where the error should display
  });
