import { LoginRequestType } from "@/types/login/LoginRequest";
import { loginResponse } from "@/types/login/loginResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function login(loginInfo:LoginRequestType){

       try{
         const response = await fetch (`/api/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(loginInfo),
        })


        const result:RouteResponse<loginResponse> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        console.log(">>> DATA: ",result.data)
        return result.data;
       }
       catch(err){
            if(err instanceof Error)
            throw new Error(err.message);
       }

}