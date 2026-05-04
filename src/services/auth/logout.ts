import { RouteResponse } from "@/types/routeResponse/routeResponse"

export async function logout(){
    try{
        const response = await fetch("/api/auth/logout",{
            method:"GET"
        })
        const result:RouteResponse<string> = await response.json();

    }
    catch(err){
        console.log("Fail to Logout")

    }
}