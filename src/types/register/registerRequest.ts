import z from "zod";

export const RegisterSchema = z.object({
    username:z.string().min(3,"Tên đăng nhập phải ít nhất 3 kí tự!"),
    password:z.string().min(8,"Mật khẩu quá yếu!"),
    confirmPass:z.string(),
    fullName:z.string().min(3,"Họ và tên phải ít nhất 3 kí tự!"),
    // Dùng string để khớp với input type="date", sau đó mới biến nó thành Date (*NOTE)
    birthDay: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Vui lòng chọn ngày/tháng/năm sinh",
  }),
}).refine((data)=>data.password === data.confirmPass,{message:"Mật khẩu không trùng khớp",path:["confirmPass"]})

export type RegisterRequestForm = z.infer<typeof RegisterSchema>;
export type RegisterRequestType = Omit<RegisterRequestForm,"confirmPass">