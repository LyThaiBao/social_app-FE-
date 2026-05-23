import { PostRequest } from "@/types/post/postRequest";
import { apiClient } from "../axios/apiClient";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { PostResponse } from "@/types/post/postResponse";
import { throwClientException } from "../exception/throwClientException";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function modifyPost(info:PostRequest,postId:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/posts/${postId}`;
    try{
        const response =await apiClient.patch<RouteResponse<PostResponse>>(url,info);
        const result =  response.data;
        console.log(">>>RESULT: ",result)
        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}