import { RegisterRequestType } from "@/types/register/registerRequest";
import { RegisterResponse } from "@/types/register/registerResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function registerMember(registerInfo:RegisterRequestType){
    try{
        const response = await fetch("/api/auth/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(registerInfo)
        })
        const result:RouteResponse<RegisterResponse> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }

    }
}