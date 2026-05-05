
import { Sparkles, MessageSquarePlus } from 'lucide-react';

export default function  EmptyChat(){
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50">
      {/* Container chính trắng tinh trên nền xám cực nhẹ */}
      <div className="flex flex-col items-center p-12 bg-white rounded-[40px] shadow-sm border w-full border-slate-100">
        
        {/* Icon xanh nhạt dịu mắt */}
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8">
          <MessageSquarePlus size={48} className="text-blue-400" strokeWidth={1} />
        </div>

        {/* Nội dung cực kỳ rõ ràng, sáng sủa */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-700 tracking-tight">
            Bắt đầu câu chuyện mới
          </h2>
          <p className="text-slate-400 max-w-[260px] text-[15px] leading-relaxed">
           Inbox trống trơn... như ví  cuối tháng .
          </p>
        </div>

        {/* Nút bấm tinh tế, không màuI mè nguy hiểm */}
        <button className="mt-10 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold text-sm transition-colors shadow-md shadow-blue-100">
          Tìm kiếm bạn bè
        </button>
      </div>

      {/* Trang trí nhẹ nhàng ở dưới */}
      <p className="mt-10 text-xs font-medium text-red-500 uppercase tracking-widest">
        100% Secure & Private Chat
      </p>
    </div>
  );
};

