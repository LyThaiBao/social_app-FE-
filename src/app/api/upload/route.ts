import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { UploadResponse } from "@/types/upload/uploadResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    console.log(">>> SIGNAL: ",request.signal)
    if (request.signal.aborted) {
       return NextResponse.json({ message: "Request aborted",data:null ,isSuccess: false   }, { status: 499 });
   }
    const formData = await request.formData();
     if (request.signal.aborted) {
       return NextResponse.json({ message: "Request aborted",data:null ,isSuccess: false   }, { status: 499 });
   }
    const file = formData.get("file");
    if(!file){
        return NextResponse.json({ message: "No file provided", data: null, isSuccess: false }, { status: 400 });
    }

    const url = `${process.env.BACKEND_URL}/api/cloud/upload`;
    const beFormData = new FormData();
    beFormData.append("file",file); 
    try{
        // const response = await fetch(url,{
        //     method:"POST",
        //     headers:{
        //         // Trình duyệt/Fetch sẽ tự động tạo Header kèm 'boundary' cho.
        //         Authorization:`Bearer ${token}`
        //     },
        //     body:beFormData,
        //     signal:request.signal
        // })
        const response = await apiServer.post<APIResponse<UploadResponse>>(url,beFormData,{signal:request.signal})
        const result =  response.data;

         return NextResponse.json({message:result.message, data:result.body,isSuccess:false},{status:200});
    }
    catch(err:unknown){
            return throwServerException(err);
    }
}