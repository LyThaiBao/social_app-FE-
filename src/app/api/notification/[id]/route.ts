import { APIResponse } from "@/types/apiResponse/APIResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest,params:{params:Promise<{id:number}>}){
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const id  = (await params.params).id;
    const url = `${process.env.BACKEND_URL}/api/notifications/${id}`;
    try{
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const result:APIResponse<null> = await response.json();

        if(!response.ok){
            return NextResponse.json({message:result.message,data:null,isSuccess:false},{status:response.status});
        }
        return NextResponse.json({message:result.message,data:result.body,isSuccess:true},{status:200});
    }
    catch(err){
            return NextResponse.json({message:"Server Error",data:null,isSuccess:false},{status:500});

    }
}