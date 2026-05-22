"use client";

import { useState } from "react";
import CreatePostForm from "./CreatePostForm";


export default function PostToolbar() {
    const [isOpenTemplate,setOpenTemplate] = useState<boolean>(false);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 mb-6 mx-auto  gap-4">
    
      <div className="">
        <button onClick={()=>setOpenTemplate(true)} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Tạo bài viết</span>
        </button>
      </div>
    {isOpenTemplate&&   <CreatePostForm setOpenTemplate={setOpenTemplate}/>}
    </div>
  );
}