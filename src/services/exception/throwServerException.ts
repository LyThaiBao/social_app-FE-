import { APIResponse } from "@/types/apiResponse/APIResponse";
import axios from "axios";
import { NextResponse } from "next/server";

export function throwServerException<T>(err:unknown){
    if(axios.isAxiosError(err) && err.response){
        const apiResponse:APIResponse<T> = err.response.data;
        return NextResponse.json({message:apiResponse.message,data:null,isSuccess:false},{status:err.response.status});
    }
    else{
        return NextResponse.json({message:"Can not connect to Server",data:null,isSuccess:false},{status:500});
    }
}