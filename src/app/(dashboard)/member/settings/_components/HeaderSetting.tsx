"use client"

import { usePathname, useRouter } from "next/navigation"

export default function HeaderSetting(){
  const router = useRouter();
  const path = usePathname(); 
  function setPath(url:string){
    if(!path.includes(url))
    router.replace(`${path}/${url}`)
  }
    return (<header className="w-full dark:bg-gray-900 pt-3 px-4 border-b border-[#ch3ch3ch3] font-sans select-none">
  <div className="flex items-end h-10 space-x-[-8px]">
    
    <button onClick={()=>setPath("appearance")} className="relative z-10 flex items-center h-full px-6 bg-white dark:bg-gray-900 rounded-t-xl cursor-pointer group shadow-[0_-1px_3px_rgba(0,0,0,0.1)] dark:shadow-[0_-1px_3px_rgba(255,255,255,255.1)]">      
      <span className="text-sm font-medium text-[#1a73e8]">Appearance</span>
    </button>

    <div className="relative flex items-center h-[calc(100%-4px)] px-6 rounded-t-xl hover:bg-[#e8eaed] cursor-pointer group transition-colors duration-150">
      <span className="text-sm font-medium text-[#5f6368] group-hover:text-[#202124]">Security</span>
    </div>

  </div>
</header>)

}