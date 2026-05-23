
import { getNewPosts } from "@/services/post/getNewPosts"
import PostList from "./_postComponents/PostList"
import PostToolbar from "./_postComponents/PostToolbar";

export default async function MemberPage(){

    const response = await getNewPosts();
    const posts = response?.content||[];
    console.log("PAGE>>> ",posts);
    return <div>
        <PostToolbar/>
       <PostList postList={posts} />
    </div>
}