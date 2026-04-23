import { MessageType } from "@/enums/messageType";

export interface MessageResponse{
    content:string;
    conversationId:number;
    senderId:number;
    senderName:string;
    messageType:MessageType;
}