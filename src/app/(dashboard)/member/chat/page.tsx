import { getConversations } from "@/services/conversation/getConversations";
import ConversationItem from "./_components/ConversationItem";
import { cookies } from "next/headers";
import { MessageResponse } from "@/types/message/messageResponse";
import { getLastMessageByConversationId } from "@/services/messages/getLastMessageByCvn";
import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import ConversationList from "./_components/ConversationList";
import EmptyChat from "./_components/EmptyChat";

export default async  function ChatPage(){
    const cook = await  cookies();
    const token = cook.get("accessToken")?.value||"";
    const conversations = await getConversations({token:token,next:{tags:["conversations"]}});
   
    // take last message 
    const conversationsAndLastMessage = await Promise.all(
      conversations.map(async (cvn)=>{
        try{
          const lastMessage = await getLastMessageByConversationId({conversationId:cvn.conversationId,token:token});
          console.log("LAST: ",lastMessage)
          return {...cvn,lastMessage:lastMessage}
        }
        catch(err){
           return {...cvn,lastMessage:null}
        }
      })

    )
    if(conversationsAndLastMessage.length == 0){
      return <EmptyChat/>
    }

     return (
    <div className=" mx-auto h-full  border-r border-gray-300 p-4 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6 px-2 ">Đoạn chat</h2>
      <ConversationList conversations={conversationsAndLastMessage}/>
    </div>
  );
}