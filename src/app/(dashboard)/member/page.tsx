
import { getNewPosts } from "@/services/post/getNewPosts"
import PostList from "./_postComponents/PostList"

export default async function MemberPage(){

    const response = await getNewPosts();
    const posts = response?.content||[];
    console.log("PAGE>>> ",posts);
    return <div>
       <PostList postList={posts} />
    </div>
}