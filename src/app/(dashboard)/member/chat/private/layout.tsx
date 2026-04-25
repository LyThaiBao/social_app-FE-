"use client"
import { ChatContext } from "@/context/ChatProvider";
import { ChatType, SchemaChat } from "@/types/conversation/schemaChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";      
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {Send} from "lucide-react"
import { ChatEnum } from "@/enums/chatEnum";
import { uploadFile } from "@/services/upload/uploadFile";
import { toast } from "sonner";
export default function PrivateChatPage({ children }: { children: React.ReactNode}) {

  const router = useRouter();
  const params  = useParams();
  const {register,handleSubmit,formState:{errors},reset,setValue} = useForm<ChatType>({resolver:zodResolver(SchemaChat)});
  const client = useContext(ChatContext);
  const [isUploading,setIsUploading] = useState<boolean>(false);
  async function onSend(mess:ChatType){
  if (isUploading) return; // Bảo vệ hàm khỏi bị gọi chồng chéo

    setIsUploading(true); // Trạng thái loading
    
    let mediaUrl = null;
    if (mess.file) {
        // Upload và xử lý lỗi
        try {
            mediaUrl = await uploadFile(mess.file); 
        } catch (error) {
            console.error("Upload fail:", error);
            setIsUploading(false); // Reset loading
            toast.error("Tải File Thất Bại")
            return; 
        }
    }
    // call service upload file to cloud --> after that we have a public id --> use it for service chat
     if(client && client.connected){
      client.publish({
        destination:"/app/chat.private",
        body:JSON.stringify({
          content:mess.message,
          mediaUrl:mediaUrl,
          conversationId:params.id,
          senderId:localStorage.getItem("memberId"),
          type:ChatEnum.CHAT.toString(),
        })
      })
      router.refresh();// refresh lai SC 
    }
    else{
      console.log(">>Chua connect");
    }
    setIsUploading(false)
    reset();
  }
  return (
    <div className="flex flex-col h-full bg-gray-50 "> 
      <main className="flex-1  p-4">
        {children}
      </main>

      <footer className={`fixed bottom-0 left-0  right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)]`}>
        <form onSubmit={handleSubmit(onSend)} className="flex items-center gap-2 max-w-4xl mx-auto">
          <input type="file"  className="text-black"  onChange={(e)=> {
            const file = e.target.files?.[0];
            if(file){
              setValue("file",file);
            }
            
          }}/>
          <input 
            type="text" 
            placeholder="Nhập tin nhắn..." 
            {...register("message")}
            className="lg:ml-50  flex-1 px-4 py-3 text-black bg-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button  className={`px-6 py-3 flex gap-2 items-center bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition`}>
            <Send/> Gửi
          </button>
        </form>
      </footer>
    </div>
  );
}