import { PostResponse } from "./postResponse";

export interface PagePostResponse{
    content:PostResponse[];
    totalElements:number;
    totalPages:number;
}