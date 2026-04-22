"use client"
import {ArrowLeft} from "lucide-react"
import { useRouter } from "next/navigation"
export default function HeaderChat({partnerName}:{partnerName:string}){
    const router = useRouter();
    return   <header className="px-4 py-3 bg-white border-b border-gray-200 shadow-sm flex items-center gap-3 text-black opacity-80">
        <button onClick={()=>{router.back()}} className="p-2 text-red-500 hover:bg-gray-100 rounded-full cursor-pointer"><ArrowLeft/></button>
        <h1 className="font-bold text-lg">{partnerName}</h1>
      </header>
}