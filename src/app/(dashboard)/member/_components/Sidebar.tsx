'use client';

import { logout } from "@/services/logout";
import { Home, Users, MessageSquare, Settings, LogOut, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  async function onLogout(){
    await logout();
    router.replace("/auth/login")
  }
  const menuItems = [
    { name: "Bảng tin", href: "/member", icon: Home },
    { name: "Bạn bè", href: "/member/friends", icon: Users },
    { name: "Tin nhắn", href: "/member/chat", icon: MessageSquare },
    { name: "Thông báo", href: "/member/notifications", icon: Bell },
    { name: "Cài đặt", href: "/member/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:block w-64 sticky top-20 h-[calc(100vh-80px)]">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 h-full flex flex-col">
        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase px-3 mb-4 tracking-widest">
            Menu chính
          </p>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "bg-blue-50 text-blue-600 font-semibold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={20} className={`${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Nút Logout nằm ở dưới cùng của Sidebar */}
        <div className="pt-4 mt-4 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all">
            <LogOut size={20} />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
}