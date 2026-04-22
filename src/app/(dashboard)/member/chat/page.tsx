import { getConversations } from "@/services/conversation/getConversations";
import ConversationItem from "./_components/ConversationItem";
import { cookies } from "next/headers";

export default async  function ChatPage(){
    const cook = await  cookies();
    const token = cook.get("accessToken")?.value||"";
    const conversations = await getConversations({token:token});
    console.log(">>>CON: ",conversations)
     return (
    <div className=" mx-auto h-screen bg-white border-r border-gray-300 p-4">
      <h2 className="text-2xl font-bold mb-6 px-2 text-black">Đoạn chat</h2>
      
      <div className="space-y-2">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.conversationId}
            name={conv.conversationName}
            type={conv.type}
            id={conv.conversationId}
            // avatar={conv.conversationAvatar}
            // lastMessage={conv.lastMessage} 
          />
        ))}
      </div>
    </div>
  );
}