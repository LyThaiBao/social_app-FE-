"use client";
import { FriendSearchResponse } from '@/types/friend/friendResponse';
import SearchChatMemberCard from './SearchChatMemberCard';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


interface MemberListProps {
  members: FriendSearchResponse;
}
export default function SearchChatMemberList({ members }: MemberListProps) {
   

  if (members.length === 0){
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center py-10 text-center px-4 select-none">
        <div className="text-3xl mb-2">🔍</div>
        <h5 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
          Không tìm thấy kết quả
        </h5>
        <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-[200px] mt-1">
          Thử kiểm tra lại chính tả hoặc tìm bằng username khác xem sao nha.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      <div className="px-2 mb-3 flex items-center justify-between select-none">
        <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
          Kết quả tìm kiếm
        </span>
        <span className="text-[11px] text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded-full font-semibold">
          {members.length} người dùng
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 pb-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
        {members.map((member) => (
          <SearchChatMemberCard
            key={member.id}
            id={member.id}
            fullName={member.fullName}
          />
        ))}
      </div>
    </div>
  );
}