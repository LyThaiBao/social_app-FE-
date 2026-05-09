"use client"



import { toRelative } from "@/utils/convertTime";
import { useRouter } from "next/navigation";
export default function FriendRequestNotifi({id,senderId,senderName,sentTime,onDelete}:{id:number,senderId:number,senderName:string,sentTime:string,onDelete:(id:number)=>void}){
  
 const router = useRouter();

    function onViewNotification(id:number){ // this fnc should more intelligen
        router.push(`/member/${id}`)
    }
    return (<div  onClick={()=>onViewNotification(senderId)} className="cursor-pointer dark:bg-gray-900 flex items-center justify-between p-4 mb-2 border-l-4 border-blue-500 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
    <div className="flex items-center space-x-4">
        <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                L
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>


        <div className="flex flex-col dark:text-white text-black">
            <p className="text-sm text-gray-800 dark:text-white">
                <span className="font-bold text-blue-600 mr-2">{senderName}</span> 
                đã gửi cho bạn một lời mời kết bạn.
            </p>
            <p  className="">Mở lòng một chút đời sẽ hạnh phúc</p>
            <span className="text-xs text-gray-500 mt-1">
               {toRelative(sentTime)} 
            </span>
        </div>
    </div>


    <div className="flex space-x-2">
        <button type="button" onClick={(e)=>{
            onDelete(id);
            e.stopPropagation();
        }} className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition-colors">
            Xóa
        </button>
    </div>
</div>)
}