"use client"
import { useContext, useEffect, useRef, useState } from "react";
import HeaderChat from "../_components/HeaderChat";
import { ChatContext } from "@/context/ChatProvider";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { getConversation } from "@/services/conversation/getConversation";
import { getMessageByConversationId } from "@/services/messages/getMessagesByCvnId";
import { MessageType } from "@/enums/messageType";
import {File,Info,Reply} from "lucide-react"
import { TypingResponse } from "@/types/message/typing";
import { MessageResponse } from "@/types/message/messageResponse";
import BoxDetail from "../_components/BoxDetail";

export default  function ChatWithMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const [currentId,setCurrentId] = useState<string|null>(null)
    const [conversationId,setConversationId] = useState<string>("");
    const [conversation,setConversation] = useState<ConversationResponse>();
      const [messages, setMessages] = useState<MessageResponse[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [typing,setTyping] = useState<TypingResponse|null>(null);
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
            console.log("LOG OLD MESS",oldMessage);
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
  
    useEffect(()=>{
        const currentId = localStorage.getItem("memberId")
        setCurrentId(currentId)
    },[])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages,conversationId]);
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

    //---------------- Typing... -------
    const timeoutRef = useRef<NodeJS.Timeout|null>(null);
    useEffect(()=>{
        if(!client?.connected || !conversationId) return;
        const sub = client.subscribe(`/topic/type.${conversationId}`,(msg)=>{
            const result = JSON.parse(msg.body);
            const typingId = result.senderId;
        
            if(typingId!=currentId){
                setTyping(result);
                if(timeoutRef.current){
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(()=>{
                    setTyping(null);
                },3000);
            }
        })
        return ()=>{
            sub.unsubscribe();
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
            }
        }
    },[client,conversationId])

    const handleDownload = async (url: string, fileName: string) => {
    try {
        //fetch ve de vao mem
        const response = await fetch(url);
        const blob = await response.blob();
        
        // tao url gia
        const blobUrl = window.URL.createObjectURL(blob);
        
        // tao the a cho no tro ve 
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', fileName); // bat no click ngay vs ten file minh dua vao
        //gan vao dom
        document.body.appendChild(link);
        link.click();
        //Dọn dẹp
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Download failed", error);
    }
};

    const [isOpenBoxDetail,setBoxDetail] = useState<boolean>(false);
    const [messageDetail,setMessageDetail] = useState<MessageResponse|null>(null);
    function onDetail(m:MessageResponse){
        console.log(m);
        setMessageDetail(m);
        setBoxDetail(true);
    }

  
    return (
        <div className="flex flex-col h-[calc(100vh-160px)]"> {/* 160px là chiều cao navbar+input chat+pading,...*/}
            <HeaderChat partnerName={conversation?conversation.conversationName:"User"} />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Detail message  */}
            {isOpenBoxDetail && <BoxDetail setBoxDetail={setBoxDetail} messageDetail={messageDetail}/>}
    {messages.map((m, index) => {
        const isMyMessage = Number(currentId) == m.senderId;
        return (
            <div key={index} className={`flex ${isMyMessage ? "justify-end" : "justify-start"}  mb-4 group `}>
                <div className={`text-black hidden text-sm group-hover:flex ${isMyMessage ?  "order-first": "order-last"} gap-5 m-2`}>
                    <button onClick={()=>onDetail(m)} >
                        <Info size={15} className="inline mr-1"/>
                        Detail</button>
                    <button>
                        <Reply size={15} className="inline mr-1"/>
                        Reply</button>
                </div>
                <div className="max-w-[70%]">
                    {m.content &&  
                    <div className={` p-3 rounded-2xl shadow-sm ${isMyMessage ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-100 text-black rounded-bl-none"}`}>
                        <p className="text-sm ">{m.content}</p>
                    </div>}
                    {/* Media */}
                    {m.messageType == MessageType.IMAGE && 
                    <div className="relative border-1">
                        <img src={m.mediaUrl} onLoad={()=>{scrollRef.current?.scrollIntoView({behavior:"smooth"})}}></img>
                        <button onClick={()=>handleDownload(m.mediaUrl,"picture")} className="absolute text-black top-10 right-10">
                            Tai xuong
                        </button>
                    </div>}
                    {m.messageType == MessageType.VIDEO && <video onLoadedData={()=>{scrollRef.current?.scrollIntoView({behavior:"smooth"})}} controls src={m.mediaUrl}></video>}
                    {m.messageType == MessageType.FILE && 
                    <button onClick={()=>handleDownload(m.mediaUrl,"fileName")}  className="text-black">
                        <File/>
                        Tai File
                    </button>} 

                    {/* ------------Typing.... */}
                </div>
                
            </div>
        );
    })}
    {typing && 
    <div onLoad={()=>{scrollRef.current?.scrollIntoView({behavior:"smooth"})}} className="flex justify-start w-full px-4 mb-5">
        <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
        <span className="text-xs text-gray-500 font-medium ml-1">
        {typing.memberName} đang soạn
        </span>
  </div>
</div>}
    <div ref={scrollRef} className="mb-2" />
</div>
        </div>
    );
}