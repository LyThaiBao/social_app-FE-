
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function  proxy(request:NextRequest){
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    console.log(`>>> MIDDLEWARE CHECKING ROUTE: ${pathname}`);

   let isAccessTokenExpired = false;

    if (accessToken) {
        try {
            const payload = decodeJwt(accessToken); 
            
            const currentTime = Math.floor(Date.now() / 1000); 
            
            if (payload.exp && payload.exp < currentTime) {
                isAccessTokenExpired = true;
            }
        } catch (err) {
            // Token lỗi, rách hoặc fake -> coi như hết hạn luôn
            isAccessTokenExpired = true; 
        }
    }
    else if (refreshToken) {
    // Không có accessToken nhưng van còn refreshToken -> cũng kích hoạt đi refresh
    isAccessTokenExpired = true;
    }
    else{
        return NextResponse.redirect(new URL("/auth/login",request.url));
    }
    if (isAccessTokenExpired) {
        
        try {
            const backendRes = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: refreshToken }),
            });
            console.log(">>>PROXY --> REFRESH: ",backendRes)
            if (backendRes.ok) {
                const resData = await backendRes.json();
                console.log(">>>[PROXY]: REFRESH ",resData)
                const newAccessToken = resData.body.accessToken;
                const newRefreshToken = resData.body.refreshToken;


                // Tạo một response mới để đè cookie xuống Browser của người dùng
                request.headers.set("Authorization",`Bearer ${newAccessToken}`);

                const modifiedResponse = NextResponse.next({
                request: {
                    headers: new Headers(request.headers),
                },
                });
                
                modifiedResponse.cookies.set('accessToken', newAccessToken, {
                    httpOnly: true, sameSite: 'lax', secure: true, path: '/'
                });
            
                modifiedResponse.cookies.set('refreshToken', newRefreshToken, {
                        httpOnly: true, sameSite: 'lax', secure: true, path: '/'
                });
                
                return modifiedResponse; //response đã được đập cookie mới thành công
            }
        } catch (error) {
            console.log("WTF :(((")
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    return NextResponse.next();


}

export const config = {
    matcher:["/member","/member/:path*"]
}   