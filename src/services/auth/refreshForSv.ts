"use server"
import { cookies } from "next/headers";

export async function setTokenCookies(accessToken: string, refreshToken: string) {
    const cook = await cookies();
    cook.set("accessToken", accessToken, { httpOnly: true, sameSite: "lax", secure: true });
    cook.set("refreshToken", refreshToken, { httpOnly: true, sameSite: "lax", secure: true });
}