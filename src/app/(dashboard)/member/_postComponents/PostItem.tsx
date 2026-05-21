"use client"
import { PostResponse } from '@/types/post/postResponse'
import {onToggleLike as toggleLike} from "@/services/like/onToggleLike"
import {Heart} from'lucide-react'
import { useRouter } from 'next/navigation'
import { toRelative } from '@/utils/convertTime'

export default function PostItem({post}:{post:PostResponse}){

  const router = useRouter();
    async function onToggleLike(postId:number){
      console.log(">>LIKE")
     const result =  await toggleLike(postId);
     router.refresh();
    }

  return <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 max-w-xl mx-auto">
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
        M12
      </div>
      <div>
        <h4 className="font-semibold  text-sm">{post.memberName}</h4>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{toRelative(post.createdAt)}</span>
          <span>•</span>
          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium uppercase tracking-wider">
            {post.status}
          </span>
        </div>
      </div>  
    </div>
    
    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM17.25 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    </button>
  </div>

  <div className="text-sm mb-3 whitespace-pre-wrap break-words leading-relaxed">
   {post.content}
  </div>

  {post.mediaUrl && <div className="mb-4 rounded-lg overflow-hidden border border-gray-50 bg-gray-50 max-h-[450px] flex items-center justify-center">
    <img 
      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" 
      alt="Post media" 
      className="w-full h-full object-cover"
    />
  </div>}

  <hr className="border-gray-100 mb-2" />

  <div className="flex items-center justify-between text-gray-500 text-sm font-medium px-2">
    <button onClick={()=>onToggleLike(post.id)}  className="flex items-center justify-center space-x-2 py-2 w-1/2 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors">
      <Heart color='red' fill = {post.liked?'red':'none'} />
      <span>Thích {post.totalLikes}</span>
    </button> 

    <button className="flex items-center justify-center space-x-2 py-2 w-1/2 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641l-.318 1.235c-.149.574.419 1.103.973.862l1.401-.611c.543-.237 1.161-.162 1.691.132A8.615 8.615 0 0 0 12 20.25Z" />
      </svg>
      <span>Bình luận</span>
    </button>
  </div>

</div>
}