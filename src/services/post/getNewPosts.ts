import { APIResponse } from "@/types/apiResponse/APIResponse";
import { apiServer } from "../axios/apiServer";
import { PagePostResponse } from "@/types/post/pagePostResponse";
import { throwServerException } from "../exception/throwServerException";

export async function getNewPosts(){
    const url = `${process.env.BACKEND_URL}/api/posts`
    console.log(">>>post>getNewPost[8]");
    try{
        const response = await apiServer.get<APIResponse<PagePostResponse>>(url);
        const result = response.data;

        return result.body;
    }
    catch(err:unknown){
        throwServerException(err);
    }
}