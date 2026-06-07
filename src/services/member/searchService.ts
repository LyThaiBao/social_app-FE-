import { FriendSearchResponse } from "@/types/friend/friendResponse"
import { throwClientException } from "../exception/throwClientException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { cookies } from "next/headers";
import { apiServer } from "../axios/apiServer";

export async function searchService({keyword}:{keyword?:string}){
    const cook = await cookies();
    const accessToken = cook.get("accessToken")?.value;
    console.log(">>> TOKEN: ",accessToken);
    const url = `${process.env.BACKEND_URL}/api/members/search?keyword=${keyword}`
    try{
        const response = await apiServer.get<APIResponse<FriendSearchResponse>>(url)
        const result =  response.data
        return result.body;
    }
    catch(err:unknown){
        console.log(">> SEARCH: ",err);
        throwClientException(err);
    }
}