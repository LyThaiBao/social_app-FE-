import { ConversationType } from "@/enums/conversationType";

export interface ConversationResponse{
    type:ConversationType;
    conversationId:number;
    conversationName:string;
}