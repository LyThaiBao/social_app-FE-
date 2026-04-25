import { APIResponse } from "@/types/apiResponse/APIResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const formData = await request.formData();
    const file = formData.get("file");
    if(!file){
        return NextResponse.json({ message: "No file provided", data: null, isSuccess: false }, { status: 400 });
    }
    const url = `${process.env.BACKEND_URL}/api/cloud/upload`;
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const beFormData = new FormData();
    beFormData.append("file",file); 
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                // Trình duyệt/Fetch sẽ tự động tạo Header kèm 'boundary' cho.
                Authorization:`Bearer ${token}`
            },
            body:beFormData
        })
        
        const result:APIResponse<string> = await response.json();
        if(!response.ok){
            return NextResponse.json({message:result.message, data:null,isSuccess:false},{status:response.status});
        }
         return NextResponse.json({message:result.message, data:result.body,isSuccess:false},{status:200});
    }
    catch(err){
             return NextResponse.json({message:"Server Error", data:null,isSuccess:false},{status:500});
    }
}