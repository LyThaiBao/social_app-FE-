import axios from "axios";
import { throwClientException } from "../exception/throwClientException";

export async function refreshToken(){
   try{
           console.log(">>> REFRESH SV");
           const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/refresh`
                ,{}
                ,{withCredentials:true})
                console.log(">>> Log refresh response: ",response.data)
        return "Refresh success";
   }
   catch(err:unknown){
     console.log(">>>ERROR IN REFRESH: ",err)
        throwClientException(err);
   }
        
        
}