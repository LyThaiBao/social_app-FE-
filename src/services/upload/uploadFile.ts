import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { UploadResponse } from "@/types/upload/uploadResponse";

export async function uploadFile(file:File,signal:AbortSignal){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/upload`
    const formData = new FormData();
   
    formData.append("file",file);
    try{
        const response = await fetch(url,{
            method:"POST",
             // Trình duyệt/Fetch sẽ tự động tạo Header kèm 'boundary' cho.
            credentials:"include",
            body:formData,
            signal:signal
        })
        const result:RouteResponse<UploadResponse> = await response.json();
         console.log(">>> SIGNAL: ",signal)
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}