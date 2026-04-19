"use client"
import { useContext, useEffect, useState } from "react";
import HeaderChat from "../_components/HeaderChat";
import { ChatContext } from "@/context/ChatProvider";

export default  function ChatWithMemberPage({ params }: { params: Promise<{ id: string }> }) {
    
    const [partnerId,setPartnerId] = useState<string>("");
    //----------------GET PARAMS----------------
    useEffect(()=>{
        (async()=>{
            const id = (await params).id;
            setPartnerId(id);
        })()
    })

    const client = useContext(ChatContext);
    const [messages, setMessages] = useState<any[]>([]);
    // ---------------
    useEffect(()=>{
        // Chỉ sub khi đã có client và đã có partnerId
        if (!client?.connected || !partnerId) return;
        const sub = client.subscribe(`/user/queue/private`,(msg)=>{
            console.log("MS >>>",msg);
        })

        return () => sub.unsubscribe();
    },[partnerId,client]);

    return (
        <div className="flex flex-col h-[calc(100vh-160px)]"> {/* 160px là chiều cao navbar+input chat+pading,...*/}
            
            {/* Header không nằm trong vùng scroll */}
            <HeaderChat partnerName="Ly Thai Bao" />

            {/* 2. Vùng chứa tin nhắn */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Nội dung chat ở đây */}
                <div className="text-black"> 
                    <h3 className="text-red-400">Chat with partner</h3>
                    {/* List messages sẽ nằm ở đây  */}
                </div>
            </div>

        </div>
    );
}