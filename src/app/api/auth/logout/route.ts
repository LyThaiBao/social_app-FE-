import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const cook = await cookies();
    cook.delete("accessToken");
    
    return NextResponse.json({message:"Đăng Xuất Thành Công"},{status:200})
}