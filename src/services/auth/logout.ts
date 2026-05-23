import { RouteResponse } from "@/types/routeResponse/routeResponse"
import axios from "axios";

export async function logout(){
  localStorage.removeItem("fullName");
  localStorage.removeItem("memberId");
    try{
        const response = await axios.get<RouteResponse<string>>("/api/auth/logout")
        const result = response.data;
        return result.data;
    }
    catch(err:any){
      if(err.response){
        const routeResponse:RouteResponse<string> = err.response.data;
        throw new Error(routeResponse.message);
      }

    }
}