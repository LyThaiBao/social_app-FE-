"use client";

import { PostType } from '@/enums/postStatus';
import { modifyPost } from '@/services/post/modifyPost';
import { PostRequest } from '@/types/post/postRequest';
import { PostResponse } from '@/types/post/postResponse';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react';
import { toast } from 'sonner';


interface PostOptionsDropdownPropsType{
  post:PostResponse;
  setOnOption:(v:boolean)=>void;
}
export default function PostOptionsDropdown({post,setOnOption}:PostOptionsDropdownPropsType) {
  const router = useRouter();
    const memberId = localStorage.getItem("memberId");
    function onCoppy(postId:number){
      console.log("ID: ",postId);
      const link = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/member/posts/${postId}`
      navigator.clipboard.writeText(link)
      .then(()=>{
        toast.success("Coppied to clipboard");
      })
      .catch((err)=>{
        toast.error(err.message);
      })
      .finally(()=>{
        setOnOption(false)
      })
    }

    async function onModify(e:ChangeEvent<HTMLSelectElement>){
      const status = e.target.value;
      const info:PostRequest = {
        content:post.content,
        status:status as PostType,
      }
      const result =  modifyPost(info,post.id);
      console.log("MODIFY >>>",result);
      toast.promise(result,{
        success:()=>{
          router.refresh();
          setOnOption(false)
         return "Cập Nhật Thành Công"
        },
        error:(err)=>{return err.message},
        loading:"Đang Cập Nhật..."
      })
      
    }
    
  return (
    <div className="inline-block text-left absolute top-5">
      <div className=" dark:bg-gray-900 dark:text-white absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30 origin-top-right focus:outline-none">
        <button onClick={()=>onCoppy(post.id)} className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-gray-700  dark:text-white  dark:hover:bg-gray-700  hover:bg-gray-50 transition-colors font-medium text-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>
          <span>Sao chép liên kết</span>
        </button>

        {Number(memberId) == post.memberId && 
       
           <div className='relative'>
            <div className="w-full flex items-center dark:text-white space-x-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-left">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.009-.542.439-.94.982-.94h1.35c.543 0 .973.398.982.94l.09 5.331 4.62-2.668c.47-.272 1.074-.105 1.345.364l.675 1.17c.271.469.105 1.073-.364 1.344l-4.62 2.668 4.62 2.668c.469.271.635.875.364 1.344l-.675 1.17c-.271.469-.875.636-1.346.364l-4.62-2.668-.09 5.331c-.009.542-.439.94-.982.94h-1.35c-.543 0-.973-.398-.982-.94l-.09-5.331-4.62 2.668c-.47 2.72-1.074.105-1.345-.364l-.675-1.17c-.271-.469-.105-1.073.364-1.344l4.62-2.668-4.62-2.668c-.469-.271-.635-.875-.364-1.344l.675-1.17c.271-.469.875-.636 1.346-.364l4.62 2.668.09-5.331Z" />
            </svg>
            <span>Chỉnh sửa chế độ xem</span>
          </div>

            <select 
            onChange={(e)=>onModify(e)}
              className="absolute inset-0 w-full h-full opacity-0 bg-gray-700 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden>Chọn chế độ</option>
              <option value="PRIVATE">PRIVATE</option>
              <option value="PUBLIC">PUBLIC</option>
              <option value="FRIENDS_ONLY">FRIENDS</option>
              <option value="DELETED">DELETE</option>
            </select>
           </div>
       }

      </div>
    </div>
  );
}