import { PostResponse } from "@/types/post/postResponse";
import PostItem from "./PostItem";

 export default function PostList({postList}:{postList:PostResponse[]}){

    return <>
    {postList.map((p)=><PostItem key={p.id} post={p}/>)}
    </>
 }