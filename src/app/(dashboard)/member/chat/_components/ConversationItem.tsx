"use client"
import { ConversationType } from "@/enums/conversationType";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ConversationItemProps {
  name: string;
  id:number;
//   avatar: string;
  lastMessage?: string;
  isActive?: boolean;
  type:ConversationType;
}

export default function ConversationItem({ name, lastMessage, isActive,type,id }: ConversationItemProps) {
    const router = useRouter();
    function onChat(){
        let url= "chat/";
        if(type.toString() == ConversationType[0].toString()){
            url += `private/${id}`;
        }
        else{
            url += `public/${id}`;
        }
        router.push(url);

    }
  return (
    <div onClick={()=>onChat()} className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 rounded-2xl 
      ${isActive ? 'bg-blue-50' : 'hover:bg-gray-300'}`}>
      
      {/* Avatar */}
      {/* <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm" /> */}

      {/* Thông tin hội thoại */}
      <div className="flex-1 min-w-0">
        <h4 className="text-gray-900 font-semibold truncate">{name}</h4>
        <p className="text-gray-500 text-sm truncate">
          {lastMessage || "Hãy bắt đầu cuộc trò chuyện..."}
        </p>
      </div>

      <div className="text-xs text-gray-400">10:30</div>
    </div>
  );
}