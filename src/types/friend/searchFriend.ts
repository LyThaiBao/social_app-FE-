import z, { string } from "zod";

export const FriendSchema = z.object({
    info:z.string("Vui lòng nhập đúng thông tin!")
})

export type FriendResearchType = z.infer<typeof FriendSchema>;