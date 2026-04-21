"use client"
import { ChatContext } from "@/context/ChatProvider";
import { ChatType, SchemaChat } from "@/types/conversation/schemaChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";      
import { useContext } from "react";
import { useForm } from "react-hook-form";
export default function PrivateChatPage({ children }: { children: React.ReactNode}) {

  const params  = useParams();
  const {register,handleSubmit,formState:{errors},reset} = useForm<ChatType>({resolver:zodResolver(SchemaChat)});
  const client = useContext(ChatContext);
  async function onSend(mess:ChatType){
    if(client && client.connected){
      client.publish({
        destination:"/app/chat.private",
        body:JSON.stringify({
          content:mess.message,
          conversationId:params.id,
          senderId:localStorage.getItem("memberId")
        })
      })
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

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSubmit(onSend)} className="flex items-center gap-2 max-w-4xl mx-auto">
          <input 
            type="text" 
            placeholder="Nhập tin nhắn..." 
            {...register("message")}
            className="flex-1 px-4 py-3 text-black bg-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition">
            Gửi
          </button>
        </form>
      </footer>
    </div>
  );
}