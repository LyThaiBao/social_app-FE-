import { MediaType } from "@/enums/mediaType";
import { PostType } from "@/enums/postStatus";
import z from "zod";



export const PostSchema = z.object({
    content:z.string().nonempty("Vui long nhap content"),
    status:z.enum(PostType),
    media:z.instanceof(File).optional(),
})

export type FormCreatePostType = z.infer<typeof PostSchema>;

export type PostRequest={
    mediaUrl?:string;
    mediaType?:MediaType;
}&Pick<FormCreatePostType,"content"|"status">;

