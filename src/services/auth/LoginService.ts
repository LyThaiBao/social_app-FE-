import { LoginRequestType } from "@/types/login/LoginRequest";
import { loginResponse } from "@/types/login/loginResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import axios from "axios";
import { throwClientException } from "../exception/throwClientException";



export async function login(loginInfo:LoginRequestType){

       try{
        const response = await axios.post<RouteResponse<loginResponse>>(
            `/api/auth/login`
            ,loginInfo)

        // dữ liệu trả về từ Server nằm trong property 'data'
        const result = response.data;
        // Axios mặc định coi các status code ngoài 2xx là Error,không cần check !response.ok
        console.log(">>> DATA: ",result.data)
        localStorage.setItem("memberId",String(result.data.memberId));
        return result.data;
       }
       catch(err:unknown){ // tren server da check loi connect
          throwClientException<loginResponse>(err);
       }

}