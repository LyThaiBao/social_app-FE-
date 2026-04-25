import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function uploadFile(file:File){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/upload`
    const formData = new FormData();
    formData.append("file",file);
    try{
        const response = await fetch(url,{
            method:"POST",
            // headers:{
            //     // "Content-Type":"multipart/form-data",
            // },
             // Trình duyệt/Fetch sẽ tự động tạo Header kèm 'boundary' cho.
            credentials:"include",
            body:formData
        })
        const result:RouteResponse<string> = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}