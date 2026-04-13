import z from "zod";


export const LoginSchema = z.object({
    username:z.string().min(1,"Tên đăng nhập không thể bỏ trống!"),
    password:z.string().min(8,"Mật khẩu phải từ 8 kí tự!"),
})

export type LoginRequestType = z.infer<typeof LoginSchema>;


//--------------------SERVICE RESPONSE