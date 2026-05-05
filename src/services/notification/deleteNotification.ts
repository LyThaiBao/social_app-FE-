import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function deleteNotification(id:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification//${id}`;
    try{
        const response = await fetch(url,{
            method:"DELETE",
            credentials:"include"
        })
        const result:RouteResponse<null> = await response.json();
        
        if(!response.ok){
            throw new Error(result.message);
        }
        return "Delete Successful";
    }
    catch(err){
        throw err;
    }
}