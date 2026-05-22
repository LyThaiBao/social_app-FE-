import { PostRequest } from "@/types/post/postRequest";
import { apiClient } from "../axios/apiClient";
import { PostResponse } from "@/types/post/postResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { throwClientException } from "../exception/throwClientException";

export async function createPost(info:PostRequest){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/posts`;
    try{
        const response = await apiClient.post<RouteResponse<PostResponse>>(url,info);
        const result = response.data;

        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}