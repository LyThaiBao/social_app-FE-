
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import ConversationItem from "./ConversationItem";
import { MessageType } from "@/enums/messageType";

export default function ConversationList({conversations}:{conversations:(ConversationResponse&{lastMessage:LastMessageResponse|null})[]}){
    return <div className="space-y-2">
        {conversations.map((conv,index) => (
          <ConversationItem
            key={conv.conversationId}
            name={conv.conversationName}
            type={conv.type}
            id={conv.conversationId}
            // avatar={conv.conversationAvatar}
            lastMessage={conv.lastMessage?.messageType === MessageType.RECALLED ? "Tin nhắn đã bị thu hồi" : conv.lastMessage?.content  || conv.lastMessage?.mediaType} 
            lastTime={conv.lastMessage?.lastTime}
          />
        ))}
      </div>

}