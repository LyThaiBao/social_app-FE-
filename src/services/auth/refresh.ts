import axios from "axios";
import { throwClientException } from "../exception/throwClientException";

export async function refreshToken(){
   try{
           console.log(">>> REFRESH SV");
           const response = await axios.post(`/api/auth/refresh`
                ,{}
                ,{withCredentials:true})
        return "Refresh success";
   }
   catch(err:unknown){
        throwClientException(err);
   }
        
        
}