"use client"
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { Menu } from "lucide-react";
import { useChatContext } from "@/hooks/useChatContext";
import { NotificationProvider } from "@/context/NotificationProvider";
import ThemeProvider from "@/context/ThemeProvider";



export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // ----------handshake after login----------
  const context = useChatContext();
  useEffect(()=>{
    context.activateChat();

    return () => {
      context.deactivateChat();
    }
  },[])


  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
   <NotificationProvider>
    <ThemeProvider>
       <div className="min-h-screen bg-[#f8fafc] " >
      <div onClick={()=>setIsSidebarOpen(false)} className={isSidebarOpen?"fixed inset-0 bg-black opacity-50 z-5":""}></div>
      <Header />
      <div className="max-w-10xl mx-auto pt-20 px-4 flex gap-6 dark:bg-gray-900">
        
       <div className={`fixed lg:relative z-40 w-64 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-[100vw]"} lg:translate-x-0`}>
          <Sidebar setSideBar={setIsSidebarOpen} />
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 absolute top-15 lg:hidden bg-white rounded-lg shadow ">
          <Menu size={24} />
        </button>
        <main className="flex-1 pb-10  h-[calc(100%-63px)]">
          {children}
        </main>
      </div>
    </div>
    </ThemeProvider>
   </NotificationProvider>
  );
}