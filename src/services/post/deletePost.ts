import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function deletePost(postId:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/posts/${postId}`;
    try{
        const response = apiClient.delete<RouteResponse<void>>(url);
        const result = (await response).data;

        return result.message;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}