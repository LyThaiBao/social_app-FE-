"use client"

import { useChatContext } from "@/hooks/useChatContext"
import { useEffect, useRef, useState } from "react";
import {XIcon} from 'lucide-react';
import Comment from "./Comment";
import { CommentResponse } from "@/types/comment/commentResponse";
import { useForm } from "react-hook-form";
import { FormCommentType, SchemaComment } from "@/types/comment/schemaComment";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CommentBox({postId,setOpenComBox}:{postId:number,setOpenComBox:(v:boolean)=>void}) {

    const [comments,setComments] = useState<CommentResponse[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const context = useChatContext();
      const {register,formState:{errors},handleSubmit,reset} = useForm<FormCommentType>({
        resolver:zodResolver(SchemaComment)
      })
    function onComment(info:FormCommentType){
         if(context.client?.connected){
             context.client.publish({
                 destination:`/app/comments.${postId}`,
                 body:JSON.stringify({
                    content:info.content,
                    postId:postId
                 })
             })
             reset({content:""})
         }
       }

       useEffect(()=>{
            ref.current?.scrollIntoView({behavior:"smooth"});
       },[comments])

    useEffect(()=>{
        if(!context.client?.connected) return;
        // 1. Đăng ký nhận comment REAL-TIME từ người khác 
        const subRealtime = context.client.subscribe(`/topic/posts.${postId}/comments`, (message) => {
        if (message.body) {
            const newComment = JSON.parse(message.body);
            console.log(">>>NEW DATA: ",newComment);
            setComments((prev) => [...prev, newComment]);
        }
    });



    // 2. Đăng ký lấy DANH SÁCH CŨ từ Server
        const subGetAll = context.client.subscribe(`/app/comments.${postId}`, (message) => {
        if (message.body) {
            const listOldComments = JSON.parse(message.body);
            console.log(">>OLD DATA: ",listOldComments);
            setComments(listOldComments); 
        }
    });
        return ()=>{
            subRealtime.unsubscribe();
            subGetAll.unsubscribe();
        }
    },[postId])

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="flex absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] dark:bg-gray-900 flex-col h-[500px] w-full max-w-lg border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
      
      <div className="px-4 flex justify-between items-center py-3 border-b border-slate-100 ">
        <h3 className="font-semibold text-slate-700 text-sm dark:text-white">Bình luận</h3>
        <button onClick={()=>setOpenComBox(false)} className="text-red-500"><XIcon/></button>
      </div>

     
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment)=><Comment comment={comment}/>)}
        < div ref={ref}/>
      </div>
      <form onSubmit={handleSubmit(onComment)} className="p-3 border-t border-slate-100 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            {...register("content")}
            placeholder="Viết bình luận công khai..."
            className="flex-1 bg-slate-50 border dark:text-white dark:bg-gray-900 border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder-slate-400"
          />
          <small>{errors.content?.message}</small>
          <button
            type="submit"
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-all duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transform rotate-45 -translate-x-0.5 translate-y-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}