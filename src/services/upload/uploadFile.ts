import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { UploadResponse } from "@/types/upload/uploadResponse";
import { throwClientException } from "../exception/throwClientException";
import { apiClient } from "../axios/apiClient";

export async function uploadFile(file:File,signal?:AbortSignal){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/upload`
    const formData = new FormData();
   
    formData.append("file",file);
    try{
        // const response = await fetch(url,{
        //     method:"POST",
        //      // Trình duyệt/Fetch sẽ tự động tạo Header kèm 'boundary' cho.
        //     credentials:"include",
        //     body:formData,
        //     signal:signal
        // })
        const response = await apiClient.post<RouteResponse<UploadResponse>>(url,formData);
        const result =  response.data;
        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}