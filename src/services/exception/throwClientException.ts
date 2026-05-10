import { RouteResponse } from "@/types/routeResponse/routeResponse";
import axios from "axios";

export function throwClientException<T>(err:unknown):never{
     if(axios.isAxiosError(err) && err.response){
                const routeResponse:RouteResponse<T> = err.response.data;
                throw new Error (routeResponse.message);
            }
            throw new Error("Unexpected error"); // ko bao gio chay vi route da handle co response va ko the connect
}