import { PostType } from "@/enums/postStatus";


export interface PostResponse {
    id: number;
    memberId:number;
    memberName:string;
    content:string;
    totalLikes:number;
    liked:boolean;
    mediaUrl:string;
    status:PostType;
    createdAt:string;    
}