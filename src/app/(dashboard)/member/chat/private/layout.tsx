"use client"
import { ChatContext } from "@/context/ChatProvider";
import { ChatType, SchemaChat } from "@/types/conversation/schemaChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";      
import { ChangeEvent, useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {Send} from "lucide-react"
import { ChatEnum } from "@/enums/chatEnum";
import { uploadFile } from "@/services/upload/uploadFile";
import { toast } from "sonner";
import { UploadResponse } from "@/types/upload/uploadResponse";
export default function PrivateChatPage({ children }: { children: React.ReactNode}) {

  const router = useRouter();
  const params  = useParams();
  const {register,handleSubmit,formState:{errors},reset,setValue,getValues} = useForm<ChatType>({resolver:zodResolver(SchemaChat)});
  const client = useContext(ChatContext);
  const [isUploading,setIsUploading] = useState<boolean>(false);
  const [media,setMedia] = useState<UploadResponse|null>(null);

  const abortControllerRef = useRef<AbortController|null>(null);

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

  async function onSend(mess:ChatType){
console.log(">>> MEDIA: ",media);
     if(client && client.connected){
      client.publish({
        destination:"/app/chat.private",
        body:JSON.stringify({
          content:mess.message,
          mediaUrl:media?.mediaUrl,
          messageType:media?.mediaType,
          conversationId:params.id,
          senderId:localStorage.getItem("memberId"),
          type:ChatEnum.CHAT.toString(),
        })
      })
      setValue("file",undefined);
      setMedia(null);
      router.refresh();// refresh lai SC 
    }
    else{
      console.log(">>Chua connect");
    }
    reset();
  }
  return (
    <div className="flex flex-col h-full bg-gray-50 "> 
      <main className="flex-1  p-4">
        {children}
      </main>

      <footer className={`fixed bottom-0 left-0  right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)]`}>
        <form onSubmit={handleSubmit(onSend)} className="flex items-center gap-2 max-w-4xl mx-auto">
    {/*  */}
    <label className={`cursor-pointer p-2 rounded-xl transition ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
      <input 
        type="file" 
        className="hidden" 
        onChange={onChangeFile} 
        // disabled={isUploading} 
      />
     {getValues("file") && 
    <div>
      <button className="text-black p-4" onClick={onCancelUpload}>Huy chon</button>
      <span className="text-blue-500">Đã chọn: {getValues("file")?.name}</span>  
    </div>}
    
    📎

    </label>
          <input 
            type="text" 
            placeholder="Nhập tin nhắn..." 
            {...register("message")}
            className="  flex-1 px-4 py-3 text-black bg-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <button 
        // disabled={isUploading}
        className={`px-6 py-3 flex gap-2 items-center rounded-2xl font-semibold transition ${
        isUploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        >
      {isUploading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Send size={18} />
      )}
      <span>{isUploading ? "Đang xử lí file..." : "Gửi"}</span>
    </button>
        </form>
      </footer>
    </div>
  );
}