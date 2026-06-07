import { getConversations } from "@/services/conversation/getConversations";
import { getLastMessageByConversationId } from "@/services/messages/getLastMessageByCvn";
import ConversationList from "./_components/ConversationList";
import EmptyChat from "./_components/EmptyChat";
import BoxSearch from "../friends/_components/BoxSearch";
import { FriendSearchResponse } from "@/types/friend/friendResponse";
import SearchChatMemberList from "./_components/SearchChatMemberList";
import { searchFriendService } from "@/services/member/searchFriendService";

export default async  function ChatPage(searchParams:{searchParams:Promise<{keyword:string}>}){

  const searPs = (await searchParams.searchParams).keyword;
    const conversations = await getConversations()||[];
   
    // take last message 
    const conversationsAndLastMessage = await Promise.all(
      conversations.map(async (cvn)=>{
        try{
          const lastMessage = await getLastMessageByConversationId({conversationId:cvn.conversationId});
          console.log("LAST: ",lastMessage)
          return {...cvn,lastMessage:lastMessage}
        }
        catch(err){
           return {...cvn,lastMessage:null}
        }
      })
    )
      const members:FriendSearchResponse  =  await searchFriendService({keyword:searPs})||[];

    if(conversationsAndLastMessage.length == 0){
      return <EmptyChat/>
    }

     return (
    <div className=" mx-auto h-full  border-r border-gray-300 p-4 text-black dark:text-white">
      <BoxSearch/>
       <SearchChatMemberList members={members}/>
      <h2 className="text-2xl font-bold mb-6 px-2 ">Đoạn chat</h2>
      <ConversationList conversations={conversationsAndLastMessage}/>
    </div>
  );
}