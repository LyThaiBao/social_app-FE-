import { MeResponse } from "@/types/me/meResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function getMe({token}:{token:string}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/me`;
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Cookie:`accessToken=${token}`,
            }
        })
        const result:RouteResponse<MeResponse> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}