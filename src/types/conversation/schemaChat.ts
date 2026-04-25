import z from "zod";

export const SchemaChat = z.object({
    message:z.string().min(1,"Vui long nhap tui nhan truoc khi gui"),
    file:z.instanceof(File,{message:"vui long chon file"}).optional(),
})

export type ChatType = z.infer<typeof SchemaChat>