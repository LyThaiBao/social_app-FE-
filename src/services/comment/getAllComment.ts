import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { CommentResponse } from "@/types/comment/commentResponse";
import { throwClientException } from "../exception/throwClientException";

export async function getAllComment(){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/comments`;
    try{
        const response = await apiClient.get<RouteResponse<CommentResponse[]>>(url);
        const result = response.data;

        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}