import { z } from "zod"

export const UploadCVSchema = z.object({
    name: z
      .string()
      .min(1, { message: "This field has to be filled." })
    ,
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    phone: z
        .string()
        .min(1, { message: "This field has to be filled." }),
    letter: z
        .string()
        .min(1, { message: "This field has to be filled." }),
    file: z
        .any()
})