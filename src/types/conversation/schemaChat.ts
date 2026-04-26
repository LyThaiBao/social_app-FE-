import z from "zod";

export const SchemaChat = z.object({
    message:z.string().optional(),
    file:z.instanceof(File,{message:"vui long chon file"}).optional(),
}).refine((data)=>data.message || data.file,{message:"Nhập tin nhắn trước khi gửi",path:["message"]}) // 1 trong 2 co data moi gui duoc

export type ChatType = z.infer<typeof SchemaChat>