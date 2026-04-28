import { MessageType } from "@/enums/messageType";

export interface MessageResponse{
    id:number;
    content:string;
    mediaUrl:string;
    conversationId:number;
    senderId:number;
    senderName:string;
    sentTime:string;
    parentId:number|null;
    parentMessageContent:string|null;
    parentMessageSenderName:string|null;
    parentMediaType:MessageType;
    messageType:MessageType;
}