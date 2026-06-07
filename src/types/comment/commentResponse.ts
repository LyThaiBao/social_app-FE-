import { boolean, number, string } from "zod";

export interface CommentResponse {
        id:number;
        memberId:number;
        memberName:string;
        postId:number;
        content:string;
        isDeleted:boolean;
        createdAt:string;
}