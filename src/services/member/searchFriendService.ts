import { FriendSearchResponse } from "@/types/friend/friendResponse"
import { throwClientException } from "../exception/throwClientException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { cookies } from "next/headers";
import { apiServer } from "../axios/apiServer";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { throwServerException } from "../exception/throwServerException";

export async function searchFriendService({keyword}:{keyword?:string}){
    console.log(">>>RESPONSE: ");
    const url = `${process.env.BACKEND_URL}/api/members/friends/search?keyword=${keyword}`
    try{
        const response = await apiServer.get<APIResponse<FriendSearchResponse>>(url)
        console.log(">>>RESPONSE: ",response)
        const result =  response.data
        return result.body;
    }
    catch(err:unknown){
        console.log(">> SEARCH: ",err);
        throwServerException(err);
    }
}