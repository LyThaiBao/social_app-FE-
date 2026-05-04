
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const url = `${process.env.BACKEND_URL}/api/notifications/markRead`;
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const info = await request.json();
    console.log("INFO: ",info);
    console.log("TOKEN: ",token);
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(info)
        })

        // console.log(">>>[mark read |Server Log]: ",response)
        //const result = await response.json(); // no content
        if(!response.ok){
            return NextResponse.json({message:"mark as read failure",data:null,isSuccess:false},{status:response.status});
        }
          return NextResponse.json({message:"mark as success read ",data:null,isSuccess:true},{status:200});
    }
    catch(err){
        console.log(">> CATCH: ",err)
          return NextResponse.json({message:"Server Error",data:null,isSuccess:false},{status:500});
    }
}