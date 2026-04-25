"use client"
import { useContext, useEffect, useRef, useState } from "react";
import HeaderChat from "../_components/HeaderChat";
import { ChatContext } from "@/context/ChatProvider";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { getConversation } from "@/services/conversation/getConversation";
import { getMessageByConversationId } from "@/services/messages/getMessagesByCvnId";

export default  function ChatWithMemberPage({ params }: { params: Promise<{ id: string }> }) {
    
    const [conversationId,setConversationId] = useState<string>("");
    const [conversation,setConversation] = useState<ConversationResponse>();
      const [messages, setMessages] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    //----------------GET PARAMS----------------
    useEffect(()=>{
        (async()=>{
            const conversationIdLocal = (await params).id;
            console.log("PARAM >>>",conversationIdLocal)
                setConversationId(conversationIdLocal);
        })()
    },[])

    //---------GET MESSAGE--------------

    useEffect(()=>{
        (async ()=>{
              if (!conversationId || conversationId === "0") return;
            const oldMessage = await getMessageByConversationId({conversationId:Number(conversationId)})
            console.log("LOG OLD MESS")
            setMessages([...oldMessage])
        })()
    },[conversationId])

    //----------Conversation------------
    useEffect(()=>{
        (async()=>{
            if (!conversationId || conversationId === "0") return;
            const id = Number(conversationId);
            const result = await getConversation({id})
            setConversation(result);
        })()
    },[conversationId])

    
    // console.log(">>>CONVER: ",conversation)
    const client = useContext(ChatContext);
  
    const currentId = localStorage.getItem("memberId");
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    // ---------------
    useEffect(()=>{
        // Chỉ sub khi đã có client và đã có partnerId
        if (!client?.connected || !conversationId) return;
        const sub = client.subscribe(`/queue/private-${conversationId}`,(msg)=>{
            const newMsg = JSON.parse(msg.body)
            // console.log("MS >>>",newMsg);
            setMessages(pre=>[...pre,newMsg]);
        })

        return () => sub.unsubscribe();
    },[client,conversationId]);

    // console.log("MESSAGE: ",messages)
    return (
        <div className="flex flex-col h-[calc(100vh-160px)]"> {/* 160px là chiều cao navbar+input chat+pading,...*/}
            <HeaderChat partnerName={conversation?conversation.conversationName:"User"} />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map((m, index) => {
        const isMyMessage = currentId == m.senderId;
        
        return (
            <div key={index} className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-4`}>
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
    <div ref={scrollRef} className="mb-2" />
</div>
        </div>
    );
}