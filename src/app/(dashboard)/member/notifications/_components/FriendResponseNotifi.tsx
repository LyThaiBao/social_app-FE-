"use client"



import { toRelative } from "@/utils/convertTime";
import { useRouter } from "next/navigation";
export default function FriendResponseNotifi({senderId,senderName,sentTime}:{senderId:number,senderName:string,sentTime:string}){
  
 const router = useRouter();

    function onViewNotification(id:number){ // this fnc should more intelligen
        router.push(`/member/${id}`)
    }
    return (<div onClick={()=>onViewNotification(senderId)} className="cursor-pointer flex items-center justify-between p-4 mb-2 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200">
    <div className="flex items-center space-x-4">
        <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                L
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>


        <div className="flex flex-col">
            <p className="text-sm text-gray-800">
                <span className="font-bold text-blue-600 mr-2">{senderName}</span> 
               đã chấp nhận lời mới kết bạn.
            </p>
            <p  className="text-black">Chat ngay thôi nào!</p>
            <span className="text-xs text-gray-500 mt-1">
               {toRelative(sentTime)} 
            </span>
        </div>
    </div>


    <div className="flex space-x-2">
        <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition-colors">
            Xóa
        </button>
    </div>
</div>)
}