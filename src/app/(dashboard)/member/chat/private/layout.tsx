import {ArrowLeft} from "lucide-react"
export default function PrivateChatPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full bg-gray-50 "> 
      
      
    

      {/* Main Chat: Để màu nền nhẹ hơn hoặc để mặc định */}
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>

      {/* Input: Thêm border-t và shadow phía trên để tạo cảm giác 'nổi' */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-2px_5px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input 
            type="text" 
            placeholder="Nhập tin nhắn..." 
            className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition">
            Gửi
          </button>
        </div>
      </footer>
    </div>
  );
}