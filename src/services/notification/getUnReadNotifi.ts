
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function getUnReadNotifi(memberId:number){
    
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification/unRead`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({memberId:memberId}),
            credentials:"include"
        })

        const result:RouteResponse<number> = await response.json();
        console.log("[service Log]: ",result)
        if(!response.ok){
            throw new Error(result.message);
        }

        return result.data;
    }
    catch(err){
        throw err;
    }
}