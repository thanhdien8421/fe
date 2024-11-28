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

export const EducationSchema = z.object({
    school: z.string(),
    major: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    employeeId: z.number()
})

export const ExperienceSchema = z.object({
    company:     z.string(),
    position:    z.string(),
    description: z.string(),
    startDate:   z.string(),
    endDate:     z.string(),
    employeeId: z.number(),
    url: z.string(),
    image: z.string()
})

export const CertificateSchema = z.object({
    name: z.string(),
    organization: z.string(),
    verifiedDate: z.string(),
    employeeId: z.number(),
    url: z.string(),
    image: z.string()
})