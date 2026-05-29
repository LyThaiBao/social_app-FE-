import { APIResponse } from "@/types/apiResponse/APIResponse";
import { apiServer } from "../axios/apiServer";
import { PostResponse } from "@/types/post/postResponse";
import { throwServerException } from "../exception/throwServerException";

export async function getPost(postId:number){
    const url = `${process.env.BACKEND_URL}/api/posts/${postId}`;
    try{
        const response = await apiServer.get<APIResponse<PostResponse>>(url);
        console.log("RESULT: ",response);
        const result = response.data;
        return result.body;
    }
    catch(err:unknown){
        console.log(">>ERR: ",err)
        throwServerException(err);
    }
}