"use client"
import { useThemeContext } from "@/hooks/useThemeContext";
import {Sun,Moon} from 'lucide-react'
export default function Page(){
    const themeContext = useThemeContext();
      const theme = themeContext.theme?.theme;
    return <div>
        <div className="flex gap-5 items-center mt-5">
            <span className="text-black dark:text-white">Mode: </span>
             <div>
            <button onClick={()=>themeContext.theme?.setTheme("light")} className={`${theme == "light"?"bg-white border border-gray-200 text-blue-600":""} dark:text-white inline-flex items-center justify-center mr-5 px-5 py-2 text-sm font-medium   rounded-lg shadow-sm border  hover:border-blue-200 active:scale-95 active:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500/20 `}>
               Light
              </button>
              <button onClick={()=>themeContext.theme?.setTheme("dark")} className={`${theme == "dark"?"bg-white border border-gray-200 text-blue-600":""} inline-flex text-black items-center justify-center mr-5 px-5 py-2 text-sm font-medium  rounded-lg shadow-sm border border-gray-200 hover:border-bg-200  active:scale-95 active:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500/20 `}>
               Dark
              </button>
          </div>
        </div>
    </div>
}