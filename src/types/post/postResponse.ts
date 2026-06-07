import { MediaType } from "@/enums/mediaType";
import { PostType } from "@/enums/postStatus";


export interface PostResponse {
    id: number;
    memberId:number;
    memberName:string;
    content:string;
    totalLikes:number;
    liked:boolean;
    mediaUrl:string;
    mediaType:MediaType;
    status:PostType;
    createdAt:string;    
}