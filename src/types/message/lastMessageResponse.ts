import { MessageType } from "@/enums/messageType";

export interface LastMessageResponse{
    content:string;
    messageType:MessageType;
    lastTime:string;
}