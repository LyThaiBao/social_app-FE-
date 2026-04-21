"use client"
import { useContext, useEffect, useState } from "react";
import HeaderChat from "../_components/HeaderChat";
import { ChatContext } from "@/context/ChatProvider";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { getConversation } from "@/services/conversation/getConversation";

export default  function ChatWithMemberPage({ params }: { params: Promise<{ id: string }> }) {
    
    const [partnerId,setPartnerId] = useState<string>("");
    const [conversation,setConversation] = useState<ConversationResponse>();
    //----------------GET PARAMS----------------
    useEffect(()=>{
        (async()=>{
            const id = (await params).id;
            setPartnerId(id);
        })()
    },[])
    //----------Conversation------------
    useEffect(()=>{
        (async()=>{
            const id = Number(partnerId);
            const result = await getConversation({id})
            setConversation(result);
        })()
    },[partnerId])

    console.log(">>>CONVER: ",conversation)
    const client = useContext(ChatContext);
    const [messages, setMessages] = useState<any[]>([]);
    const currentId = localStorage.getItem("memberId");
    // ---------------
    useEffect(()=>{
        // Chỉ sub khi đã có client và đã có partnerId
        if (!client?.connected || !partnerId) return;
        const sub = client.subscribe(`/queue/private-${partnerId}`,(msg)=>{
            const newMsg = JSON.parse(msg.body)
            console.log("MS >>>",newMsg);
            setMessages(pre=>[...pre,newMsg]);
        })

        return () => sub.unsubscribe();
    },[client,partnerId]);

    console.log("MESSAGE: ",messages)
    return (
        <div className="flex flex-col h-[calc(100vh-160px)]"> {/* 160px là chiều cao navbar+input chat+pading,...*/}
            <HeaderChat partnerName="" />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map((m, index) => {
        const isMyMessage = currentId == m.senderId;
        
        return (
            <div key={index} className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                    isMyMessage 
                        ? "bg-blue-500 text-white rounded-br-none" 
                        : "bg-gray-100 text-black rounded-bl-none"
                }`}>
                    <p className="text-sm">{m.content}</p>
                </div>
            </div>
        );
    })}
</div>
        </div>
    );
}