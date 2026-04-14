"use client";

import { FriendSearchResponse } from "@/types/friend/friendResponse";
import MemberCard from "./MemberCard";


interface MemberListProps {
  members: FriendSearchResponse;
}

export default function MemberList({ members }: MemberListProps) {
  // Trường hợp không tìm thấy ai
  if (members.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-400 text-sm italic">Không tìm thấy thành viên nào phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 mt-6">
      {members.map((member) => (
        <MemberCard 
          key={member.id} 
          id={member.id} 
          fullName={member.fullName} 
        />
      ))}
    </div>
  );
}