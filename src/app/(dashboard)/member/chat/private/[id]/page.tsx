"use client"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import HeaderChat from "../_components/HeaderChat";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { getConversation } from "@/services/conversation/getConversation";
import { getMessageByConversationId } from "@/services/messages/getMessagesByCvnId";
import { MessageType } from "@/enums/messageType";
import {File,Info,Reply, Send,Trash2} from "lucide-react"
import { TypingResponse } from "@/types/message/typing";
import { MessageResponse } from "@/types/message/messageResponse";
import BoxDetail from "../_components/BoxDetail";
import { UploadResponse } from "@/types/upload/uploadResponse";
import { useForm } from "react-hook-form";
import { ChatType, SchemaChat } from "@/types/conversation/schemaChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "@/services/upload/uploadFile";
import { toast } from "sonner";
import { ChatEnum } from "@/enums/chatEnum";
import { handleDownload } from "@/utils/download";
import Typing from "../_components/Typing";
import { MediaType } from "@/enums/mediaType";
import BlankChat from "./_components/BlankChat";
import { useChatContext } from "@/hooks/useChatContext";


export default  function ChatWithMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const [currentId,setCurrentId] = useState<string|null>(null)
    const [conversationId,setConversationId] = useState<string>("");
    const [conversation,setConversation] = useState<ConversationResponse>();
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [typing,setTyping] = useState<TypingResponse|null>(null);
    const [replyMessage,setReplyMessage]= useState<MessageResponse|null>(null);

    //---------Get Current member id for show UI their MSG-----------
    useEffect(()=>{
        const currentId = localStorage.getItem("memberId")
        setCurrentId(currentId)
    },[])
    //----------------------------------------------------
        const context = useChatContext();
    
    //----------------GET Conversation ID----------------
    useEffect(()=>{
        (async()=>{
            const conversationIdLocal = (await params).id;
                setConversationId(conversationIdLocal);
        })()
    },[])

        //---------GET OLD MSG--------------
    useEffect(()=>{
        (async ()=>{
            if (!conversationId || conversationId === "0") return;
            const oldMessage = await getMessageByConversationId({conversationId:Number(conversationId)})
            console.log("LOG OLD MESS",oldMessage);
            setMessages([...oldMessage])
            console.log(">>>GET OLD MSG")
        })()
    },[conversationId])
   //------------When user appear in this compo all msg of this conv is mark as read

    useEffect(()=>{
        context.markAsRead(conversationId)
                console.log(">>> MARK READ")

    },[messages,conversationId])

    //----------Get Conversation ------------
    useEffect(()=>{
        (async()=>{
            if (!conversationId) return;
            const id = Number(conversationId);
            const result = await getConversation({id})
            setConversation(result);
        })()
    },[conversationId])



    //--------Scroll-------------------------------------------------
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages,conversationId]);

    // ---------------Sub convesation -------------------------------
   
    useEffect(()=>{
        if (!context.client || !context.client.connected) return;
        const sub = context.client.subscribe(`/user/queue/private`,(msg)=>{
            console.log("NEW MSG: ",msg)
            const newMsg = JSON.parse(msg.body)
            setMessages(pre=>[...pre,newMsg]);
        })
        return () => sub.unsubscribe();
    },[context.client?.connected]);

    //---------------- Typing-----------------
    const timeoutRef = useRef<NodeJS.Timeout|null>(null);
    useEffect(()=>{
        if(!context.client?.connected || !conversationId) return;
        const sub = context.client.subscribe(`/topic/type.${conversationId}`,(msg)=>{
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
    },[context.client,conversationId])

    //-----------------_---Recall------------------
    useEffect(()=>{
        if(!context.client?.connected || !conversationId) return;
       context.client.subscribe(`/user/queue/recall`,(msg)=>{
            const recalledMSG:MessageResponse = JSON.parse(msg.body);
            console.log(">>RECALL: ",recalledMSG)
        setMessages(pre => pre.map((m)=>{
            if(m.id == recalledMSG.id){
                return recalledMSG;
            }
            if(m.parentId == recalledMSG.id){
                return {...m,parentMessageType:MessageType.RECALLED}
            }
            return m;
        }))
    })
    },[context.client,conversationId])
    


// -----------------------------------------------------------------------------------


  const [isUploading,setIsUploading] = useState<boolean>(false);
  const [media,setMedia] = useState<UploadResponse|null>(null);
  
  const abortControllerRef = useRef<AbortController|null>(null);

  const {register,handleSubmit,formState:{errors},reset,setValue,getValues,setFocus} = useForm<ChatType>({resolver:zodResolver(SchemaChat)});

  async function onChangeFile(e:ChangeEvent<HTMLInputElement,HTMLInputElement>){
    setIsUploading(true);
    const file = e.target.files?.[0];
    const controller = new AbortController();
    abortControllerRef.current = controller;
  
      if(file){
        setValue("file",file);
      try{
        if(!isUploading){
          const mdaURL = await uploadFile(file,controller.signal);
          console.log(">> Uploaded: ",mdaURL);
          setMedia(mdaURL);
        }
      }
      catch(err:any){
      if (err.name === 'AbortError') {
          console.log(">> Đã hủy upload!");
        } 

      else {
        toast.error(err.message);
        }
      }
      finally{
          setIsUploading(false);
      }
      }
    
  }
  async function onCancelUpload(){
    abortControllerRef.current?.abort();
    setMedia(null);
    setIsUploading(false);
    setValue("file",undefined);
  }

  //--------------------Public still work here -------------------------------
  async function onSend(mess:ChatType){
     if(context.client && context.client.connected){
      context.client.publish({
        destination:"/app/chat.private",
        body:JSON.stringify({
          content:mess.message,
          messageType:mess.message ? MessageType.TEXT: null,
          mediaUrl:media?.mediaUrl,
          mediaType:media?.mediaType,
          conversationId:conversationId,
          parentMessageId:replyMessage?.id,
          senderId:localStorage.getItem("memberId"),
          type:ChatEnum.CHAT.toString(),
        })
      })
      setValue("file",undefined);
      setMedia(null);
    //   router.refresh();// refresh lai SC 
      //------------Case reply-----------
      setReplyMessage(null);
    }
    else{
      console.log(">>Chua connect");
    }
    reset();
  }

  async function onTyping(){
   if(context.client && context.client.connected){
    context.client.publish({
      destination:`/app/public.type.${conversationId}`,
      body:JSON.stringify({
        type:"Typing...",
        senderId:localStorage.getItem("memberId")
      })
    })
   }
  }
  
    const [isOpenBoxDetail,setBoxDetail] = useState<boolean>(false);
    const [messageDetail,setMessageDetail] = useState<MessageResponse|null>(null);
    // ----onDetail----
    function onDetail(m:MessageResponse){
        setMessageDetail(m);
        setBoxDetail(true);
    }
    // ----onReply----
    function onReply(m:MessageResponse){
        setReplyMessage(m);
        setFocus("message")
    }
    // -----onDelete------
    function onDelete(m:MessageResponse){
        if(context.client && context.client.connected){
            context.client.publish({
                destination:`/app/chat.recall`,
                body:JSON.stringify({
                    id:m.id,
                    conversationId:conversationId
                })
            })
        }
    }


    return (
        <div className="flex flex-col h-[calc(100vh-210px)]"> {/* 210px là chiều cao navbar+input chat+pading,...*/}
            <HeaderChat partnerName={conversation?conversation.conversationName:"User"} />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/*--------------------------- Detail message ---------------------------*/}
            {isOpenBoxDetail && <BoxDetail setBoxDetail={setBoxDetail} messageDetail={messageDetail}/>}
            {messages.length == 0 && <BlankChat/>}
            {messages.map((m, index) => {
            const isMyMessage = Number(currentId) == m.senderId;
        
        
        return ( // ------------------------Show Message ------------------------------------
            <div key={m.id} className={`flex ${isMyMessage ? "justify-end" : "justify-start"}  mb-4 group `}>
                {m.parentId && m.messageType != MessageType.RECALLED && (
                <div onClick={() => {
                const el = document.getElementById(`${m.parentId}`);
                if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.classList.add("ring-2", "ring-blue-500");
                setTimeout(() => el.classList.remove("ring-2", "ring-blue-500"), 1500);
            }
        }} className="mb-2 p-2 border-l-4 border-blue-400 bg-gray-100 rounded-r-lg text-sm">
                    <div className="font-semibold text-blue-600 text-xs">
                        {m.parentMessageSenderName || "Người dùng"}
                    </div>
                    <p className="text-gray-700 truncate italic">
                            {m.parentMessageType == MessageType.RECALLED ? "Tin nhắn đã bị thu hồi" :  m.parentMessageContent  || m.parentMediaType }
                    </p>
                </div>
)}
                <div className={`text-black dark:text-white hidden text-sm group-hover:flex ${isMyMessage ?  "order-first": "order-last"} gap-5 m-2`}>
                    <button onClick={()=>onDetail(m)} >
                        <Info size={15} className="inline mr-1"/>
                        Detail
                    </button>

                    {m.messageType != MessageType.RECALLED &&
                    <button  onClick={()=>onReply(m)}>
                        <Reply size={15} className="inline mr-1"/>
                        Reply
                    </button>}

                    {m.messageType != MessageType.RECALLED && isMyMessage &&
                    <button onClick={()=>onDelete(m)}>
                        <Trash2 size={15} className="inline mr-1"/>
                        Delete
                    </button>
                    }
                </div>

                <div className="max-w-[70%]" id={`${m.id}`}>
                    
                    <div className={` p-3 rounded-2xl shadow-sm text-black dark:text-white ${isMyMessage ? "bg-blue-500  rounded-br-none text-white" : "bg-gray-100  rounded-bl-none dark:bg-gray-600 "}`}>
                        <p className="text-md ">{m.messageType == MessageType.RECALLED ? "Tin nhắn đã bị thu hồi" : m.content}</p>
                        <small className="text-[10px]">{m.sentTime}</small>
                    </div>
                       
                    {/* Media */}
                    {m.mediaType == MediaType.IMAGE && m.messageType != MessageType.RECALLED &&
                    <div className="relative border-1">
                        <img src={m.mediaUrl} onLoad={()=>{scrollRef.current?.scrollIntoView({behavior:"smooth"})}}></img>
                        <button onClick={()=>handleDownload(m.mediaUrl,"picture")} className="absolute text-black top-10 right-10">
                            Tai xuong
                        </button>
                    </div>}
                    {m.mediaType == MediaType.VIDEO && m.messageType != MessageType.RECALLED && <video onLoadedData={()=>{scrollRef.current?.scrollIntoView({behavior:"smooth"})}} controls src={m.mediaUrl}></video>}
                    {m.mediaType == MediaType.FILE && m.messageType != MessageType.RECALLED &&
                    <button onClick={()=>handleDownload(m.mediaUrl,"fileName")}  className="text-black">
                        <File/>
                        Tai File
                    </button>} 
                </div>
                
            </div>
        );
        })}
     {/* --------------------------------------Typing---------------------------- */}
    {typing && <Typing memberName={typing.memberName}/>}

    {/*---------------------------------------Reply-------------------------------*/}
   {replyMessage && (
    <div  className="fixed bg-white border-t border-gray-200 bottom-[75px] left-0 right-0 p-3 px-6 shadow-md z-10 lg:left-[277px]">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Đang trả lời: <b>{replyMessage.senderName}</b></span>
            <button onClick={() => setReplyMessage(null)}>✕</button>
        </div>
        <p className="text-gray-800 italic truncate">{replyMessage.content}</p>
    </div>
)}

    {/* -------------------------------------------------------------------------------------------------- */}
     <footer className={`fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)]`}>
        <form onSubmit={handleSubmit(onSend)} className="flex items-center gap-2 max-w-4xl mx-auto">
   
     {getValues("file") && 
    <div  className="text-blue-500 truncate line-clamp-1">
      <button className="text-black p-4" onClick={onCancelUpload}>Huy chon</button>
      <span>Đã chọn: {getValues("file")?.name}</span>  
    </div>}
    
    <label className={`cursor-pointer p-2 rounded-xl transition ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
      <input 
        type="file" 
        className="hidden" 
        onChange={onChangeFile} 
        disabled={isUploading} 
      />
    📎
    </label>
        <input type="text" placeholder="Nhập tin nhắn..." {...register("message")}
            onClick={onTyping}
            className="  flex-1 px-4 py-3 text-black bg-gray-100 dark:bg-gray-800 dark:text-white  border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500" />

         <button className={`px-6 py-3 flex gap-2 items-center rounded-2xl font-semibold transition ${isUploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
            {isUploading ? ( <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>) : (<Send size={18} />)}
            <span>{isUploading ? "Đang xử lí file..." : "Gửi"}</span>
        </button>
        </form>
      </footer>
    <div ref={scrollRef} className="mb-2" />
    </div>
</div>);
}