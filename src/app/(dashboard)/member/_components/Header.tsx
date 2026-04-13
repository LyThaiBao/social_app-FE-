'use client';

import { getFirstChar } from "@/utils/getFirstChar";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  // const character = getFirstChar(fullName);

  const [fullName,setFullName] =useState(localStorage.getItem("fullName")||"");
 

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/member" className="text-2xl font-black text-blue-600 tracking-tighter">
          SOCIALAPP
        </Link>

        

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-200">
              {getFirstChar(fullName)}
            </div>
            <span className="hidden md:block text-sm font-semibold text-slate-700">{fullName}</span>
          </div>
        </div>

      </div>
    </header>
  );
}