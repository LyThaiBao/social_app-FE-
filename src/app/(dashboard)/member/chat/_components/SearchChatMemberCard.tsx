"use client";

import { findOrCreateConversation } from "@/services/conversation/findOrCreateConversation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MemberProps {
  id: string | number;
  fullName: string;
}

export default function SearchChatMemberCard({ id, fullName }: MemberProps) {
  const router = useRouter();
  async function onChat(memberId: string | number) {
    const cvn = await findOrCreateConversation({partnerId:Number(id)})
        router.push(`chat/private/${cvn.conversationId}`)
}

  return (
    <div 
      onClick={() => onChat(id)}  
      className="flex items-center justify-between p-3.5 text-black dark:text-white bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl hover:bg-sky-50/50 dark:hover:bg-zinc-800/60 hover:border-sky-200 dark:hover:border-sky-900/50 transition-all cursor-pointer group select-none"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 text-white rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0">
          {fullName.charAt(0).toUpperCase()}
        </div>
          
        <div className="min-w-0">
          <h4 className="font-semibold text-sm group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
            {fullName}
          </h4>
       
        </div>
      </div>

      <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-500 transition-all flex-shrink-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
    </div>
  );
}