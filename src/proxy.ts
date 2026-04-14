
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request:NextRequest){
    const token = request.cookies.get("accessToken")?.value;
    console.log(">>> TOKEN: ",token)
    if(!token){
        return NextResponse.redirect(new URL("/auth/login",request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher:["/member","/member/:path*"]
}   