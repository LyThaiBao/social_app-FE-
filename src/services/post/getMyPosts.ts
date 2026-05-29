import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { PostResponse } from "@/types/post/postResponse";
import { PagePostResponse } from "@/types/post/pagePostResponse";

export async function getMyPosts(page?:number ,size?:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/posts/myPosts`;//?page=${page}&size=${size}
    try{
        const response = await apiClient.get<RouteResponse<PagePostResponse>>(url);
        const result = response.data
        console.log(">>> CLIENT: ",result);
        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
    
}