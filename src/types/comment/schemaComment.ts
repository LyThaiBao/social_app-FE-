import z from "zod";

export const SchemaComment = z.object({
    content:z.string().nonempty("Không thể bỏ trống bình luật")
})

export type FormCommentType = z.infer<typeof SchemaComment>; 