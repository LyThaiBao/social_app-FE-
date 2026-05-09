"use client"
import { getFirstChar } from "@/utils/getFirstChar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {Moon,Sun} from "lucide-react"
import { useThemeContext } from "@/hooks/useThemeContext";

export default function Header() {
  const themeContext = useThemeContext();
  const theme = themeContext.theme?.theme;

  const [fullName,setFullName] =useState<string>("User");
  useEffect(()=>{
    (()=>{
      setFullName(localStorage.getItem("fullName")||"User")
    })()
  },[])

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b text-blue-500 border-slate-200 z-50 dark:bg-gray-900 dark:text-blue-500`}>
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/member" className="text-2xl font-black text-blue-500 tracking-tighter">
          SOCIALAPP
        </Link>

        

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200  text-blue-600">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-bold text-sm border border-blue-200">
              {getFirstChar(fullName)}
            </div>
            <span className="hidden md:block text-sm font-semibold">{fullName}</span>
          </div>
          <div>
            {theme == "dark" && <button onClick={()=>themeContext.theme?.setTheme("light")}>
                <Sun className="text-orange-500" /> 
              </button>}
             {theme == "light" && <button onClick={()=>themeContext.theme?.setTheme("dark")}>
                <Moon className="text-orange-500" /> 
              </button>}
          </div>
        </div>

      </div>
    </header>
  );
}