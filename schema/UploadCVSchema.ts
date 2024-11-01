import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}

export const UploadCVSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  phone: z.string().min(1, { message: "This field has to be filled." }),
  letter: z.string().min(1, { message: "This field has to be filled." }),
  file: z
    .any()
    .refine((file: File) => file?.size !== 0, "File is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkFileType(file),
      "Only .pdf, .docx formats are supported."
    ),
});
