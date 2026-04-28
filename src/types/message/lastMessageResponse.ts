import { MediaType } from "@/enums/mediaType";
import { MessageType } from "@/enums/messageType";

export interface LastMessageResponse{
    content:string;
    messageType:MessageType;
    mediaType:MediaType;
    lastTime:string;
}