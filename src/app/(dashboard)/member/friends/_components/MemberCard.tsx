"use client";

import { useRouter } from "next/navigation";

interface MemberProps {
  id: string | number;
  fullName: string;
}

export default function MemberCard({ id, fullName }: MemberProps) {
  const router = useRouter();
  function onView(id:string|number){
    router.push(`/member/${id}`)
  }
  return (
    <button onClick={()=>onView(id)}  className="flex items-center justify-between p-4 text-black dark:bg-gray-800 dark:text-white bg-white border border-slate-100 rounded-2xl hover:bg-blue-50/50 dark:hover:bg-gray-800 hover:border-blue-200  transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center  font-bold text-lg shadow-sm">
          {fullName.charAt(0).toUpperCase()}
        </div>
          
        <div>
          <h4 className="font-semibold group-hover:text-blue-600 transition-colors">
            {fullName}
          </h4>
          <p className="text-xs text-slate-500">ID: #{id}</p>
        </div>
      </div>

      {/* Nút thao tác (Add friend/View profile) */}
      <button  className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14m-7-7v14"/>
        </svg>
      </button>
    </button>
  );
}