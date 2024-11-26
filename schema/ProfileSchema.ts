import { z } from "zod";
import validator from "validator";

export const ProfileUpdateSchema = z.object({
    email: z.string()
        .min(1, { message: "Bắt buộc" })
        .email("Email không hợp lệ"),
    password: z.string()
        .min(1, { message: "Bắt buộc" }),
    phone: z.string()
        .refine(validator.isMobilePhone, { message: "Số điện thoại không hợp lệ" }),
    address: z.string(),
    name: z.string(),
    gender: z.string()
        .min(1, { message: "Bắt buộc" }),
    age: z.coerce.number()
        .int("Thông tin không hợp lệ.")
})