import { MediaType } from "@/enums/mediaType";
import { MessageType } from "@/enums/messageType";

export interface UploadResponse{
    mediaUrl:string;
    mediaType:MediaType;
}