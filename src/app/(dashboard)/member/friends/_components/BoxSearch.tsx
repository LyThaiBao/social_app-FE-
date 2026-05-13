
"use client"
import { FriendResearchType, FriendSchema } from "@/types/friend/searchFriend"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form" 


export default function BoxSearch(){
    const currentPath  = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const router = useRouter();
 
    async function onSearch(info:FriendResearchType){
        if(searchParams.get("keyword")){
            params.delete("keyword");
        }
        params.append("keyword",info.info)

            router.push(`${currentPath}?${params.toString()}`)

    }
    const {register,formState:{errors},handleSubmit} = useForm<FriendResearchType>({
        resolver:zodResolver(FriendSchema)
    })
  
    return <div className="w-full max-w-2xl mx-auto mb-8">
  <div className="relative group">
    
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-slate-400 group-focus-within:text-blue-500 transition-colors"
      >
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </div>

   <form onSubmit={handleSubmit(onSearch)}>
     <input
      type="text"
      placeholder="Nhập username để tìm bạn bè..."
      className="block w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm 
             placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 
             focus:border-blue-500 transition-all text-sm outline-none text-black dark:bg-gray-800 dark:text-white"
             {...register("info")}
    /> 

    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
      </button>
    </div>

   </form>
  </div>

  <p className="mt-2 text-[11px] text-slate-400 ml-3 flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    Gợi ý: Tìm theo @Username chính xác để có kết quả tốt nhất 
  </p>
  </div>
}