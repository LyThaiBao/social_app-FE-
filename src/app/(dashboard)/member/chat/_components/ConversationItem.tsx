"use client"
import { ConversationType } from "@/enums/conversationType";
import { MessageType } from "@/enums/messageType";
import { useChatContext } from "@/hooks/useChatContext";
import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import { toRelative } from "@/utils/convertTime";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { string } from "zod";

interface ConversationItemProps {
  name: string;
  id:number;
//   avatar: string;
  lastMessage: LastMessageResponse|null;
  lastTime:string;
  isActive?: boolean;
  type:ConversationType;
}

export default function ConversationItem({ name, lastMessage,lastTime, isActive,type,id }: ConversationItemProps) {
  const context = useChatContext();
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

    const ownerId = useMemo(()=>{
      const id = localStorage.getItem("memberId");
      return id;
    },[id])
   
    const {unRead} = context;
    console.log(">>UNREAD: ",unRead)
  return (
    <div onClick={()=>onChat()} className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 rounded-2xl border-1 border-blue-200 text-black  dark:text-white  dark:border-1  
      ${isActive ? 'bg-blue-50' : 'hover:bg-gray-300 dark:hover:bg-gray-800'}`}>
     
      {/* Avatar */}
      {/* <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm" /> */}

      {/* Thông tin hội thoại */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold truncate">{name}</h4>
        <p className="text-gray-500 text-sm truncate">
          {unRead[id] ? <b className="text-black">Có tin nhắn chưa đọc</b>: lastMessage?.messageType == MessageType.RECALLED?"Tin nhắn đã bị thu hồi":
          lastMessage?.content ? ((lastMessage?.senderId != Number(ownerId)?`${lastMessage?.senderName}: `:"Bạn: ") + `${lastMessage?.content ? lastMessage.content: lastMessage?.mediaType}`):"Hãy bắt đầu cuộc trò chuyện..." }
        </p>
      </div>

      <div className="text-xs text-gray-400">{lastTime ? toRelative(lastTime): ""}</div>
    </div>
  );
}