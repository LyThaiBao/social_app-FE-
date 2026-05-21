import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { apiClient } from "../axios/apiClient"
import { LikeResponse } from "@/types/likeResponse/likeResponse";
import { throwClientException } from "../exception/throwClientException";

export async function onToggleLike(postId:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/posts/${postId}/likes`
    try{
        const response = await apiClient.post<RouteResponse<LikeResponse>>(url);
        const result = response.data;

        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}