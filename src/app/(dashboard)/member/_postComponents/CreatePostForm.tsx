"use client";
import { createPost } from '@/services/post/createPost';
import { uploadFile } from '@/services/upload/uploadFile';
import { FormCreatePostType, PostRequest, PostSchema } from '@/types/post/postRequest';
import { UploadResponse } from '@/types/upload/uploadResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import {XIcon} from 'lucide-react'
import { useRouter } from 'next/navigation';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';


interface CreatePostFormPropsType{
  setOpenTemplate:(v:boolean)=>void;
}
export default function CreatePostForm({setOpenTemplate}:CreatePostFormPropsType) {

  const router = useRouter();
  const [isUpload,setUpload] = useState<boolean>(false);
  const [media,setMedia] = useState<UploadResponse|null>(null);


 async function onChangeHandler(e:ChangeEvent<HTMLInputElement, HTMLInputElement>){
      const file = e.target.files?.[0];
      setUpload(true);
      if(file){
        setValue("media",file);
        const media = await uploadFile(file);
        console.log(">>>MEDIA: ",media);  
        setMedia(media);
        setUpload(false);
      }
  }

  async function onCreate(info:FormCreatePostType){
    console.log("INFO >>",info)
    const memberId = localStorage.getItem("memberId");
    const dataSend:PostRequest = {
      content:info.content,
      mediaUrl:media?.mediaUrl,
      mediaType:media?.mediaType,
      status:info.status,
    }
    const create  =  createPost(dataSend);
    toast.promise(create,{
      success:()=>{
           router.refresh();
        return "Created";
      },
      error:(err)=>{return err},
      loading:"Creating..."
    })
 
    setOpenTemplate(false);

    
  }

  const {register,setValue,watch,reset,formState:{errors},handleSubmit} = useForm<FormCreatePostType>({resolver:zodResolver(PostSchema)});

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
     <div className="bg-white rounded-xl dark:bg-gray-900 shadow-sm border border-gray-100 p-5 min-w-[70%] md:min-w-[60%] fixed top-[50%] left-[50%] -translate-x-[50%]  -translate-y-[50%]">
      
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-base dark:text-white">Tạo bài viết mới</h3>
          <button onClick={()=>setOpenTemplate(false)} className='text-red-500'><XIcon/></button>
      </div>

      <form onSubmit={handleSubmit(onCreate)}>
        
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider  mb-2">
            Chế độ hiển thị
          </label>
          <select 
          {...register("status")}
            className="w-full   sm:w-auto bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
          >
            <option value="PUBLIC">Công khai (PUBLIC)</option>
            <option value="FRIENDS_ONLY">Bạn bè (FRIENDS)</option>
            <option value="PRIVATE">Chỉ mình tôi (PRIVATE)</option>
          </select>
          <small className = "text-red-500">{errors.status?.message}</small>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Nội dung bài viết
          </label>
          <textarea
            {...register("content")}
            rows={4}
            placeholder="Bạn đang nghĩ gì thế?..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg p-3 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none leading-relaxed "
          />
          <small className = "text-red-500">{errors.content?.message}</small>
          <p className="mt-1 text-xs text-red-500 hidden">Vui lòng nhập content</p>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Hình ảnh / Video (Tùy chọn)
          </label>
          
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed    rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 px-4 text-center ">
             {watch("media") && !isUpload&& watch("media")?.name}
             {isUpload&&<div>Uploading...</div>}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                <p className="text-sm font-medium">Nhấp để tải file lên</p>
                <p className="text-xs text-gray-400 mt-0.5">Hỗ trợ Ảnh hoặc Video</p>
              </div>
              <input 
                {...register("media")}
                onChange={onChangeHandler}
                type="file" 
                className="hidden" 
                accept="image/*,video/*"
              />
              <small className = "text-red-500">{errors.media?.message}</small>
            </label>
          </div>
          <p className="mt-1 text-xs text-red-500 hidden">Vui lòng chọn media</p>
        </div>

      
        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-gray-100">
          <button 
          onClick={()=>setOpenTemplate(false)}
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button 
            
            disabled={isUpload}
            type="submit"
            className={` px-5 py-2 text-sm font-medium text-white   hover:bg-blue-700 rounded-lg transition-colors shadow-sm bg${isUpload ? "-gray-700":"-blue-600"}`}
          >
            {isUpload ? "Đang xử lí dữ liệu...":"Đăng bài"}
          </button>
        </div>
      </form>

    </div>
   </div>
  );
}