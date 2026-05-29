import { getPost } from "@/services/post/getPost";
import PostItem from "../../_postComponents/PostItem";

export default async function PostDetailPage({params}:{params:Promise<{id:string}>}){
    const id = (await params).id;
    console.log(">>>ID: ",id);
    const  post = await getPost(Number(id));
    
    if(!post){
        throw new Error("NOT FOUND");
    }
    return <div>
        
        <PostItem post={post}/>
    </div>
}