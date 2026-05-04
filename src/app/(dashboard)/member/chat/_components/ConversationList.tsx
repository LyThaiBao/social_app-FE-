
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import ConversationItem from "./ConversationItem";


export default function ConversationList({conversations}:{conversations:(ConversationResponse&{lastMessage:LastMessageResponse|null})[]}){
    return <div className="space-y-2">
        {conversations.map((conv,index) => (
          <ConversationItem
            key={conv.conversationId}
            name={conv.conversationName}
            type={conv.type}
            id={conv.conversationId}
            // avatar={conv.conversationAvatar}
            lastMessage={conv.lastMessage} 
            lastTime={conv.lastMessage?conv.lastMessage.lastTime:""}
          />
        ))}
      </div>

}