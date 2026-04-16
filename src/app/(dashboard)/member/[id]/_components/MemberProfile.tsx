"use client"
import { sendRequest } from "@/services/friendShip/sendRequest";
import { FriendShipDetail } from "@/types/friendShip/friendShipDetail";
import { MeResponse } from "@/types/me/meResponse";
import { Calendar, IdCard, Mail, MapPin, User, MessageCircle, UserPlus } from "lucide-react";

interface MemberProfileProps {
  data: {
    id: number;
    fullName: string;
    birthDay: Date;
    joinDay:Date;
  },
}

export default function MemberProfileWide({ data }: MemberProfileProps) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${data.fullName.replace(" ", "+")}&background=0D8ABC&color=fff&size=200`;
  const bd = new Date(data.birthDay);
 const jd = new Date(data.joinDay);
  const idUrSelf = Number(localStorage.getItem("memberId"));
 async function send(){
  if(idUrSelf){
    await sendRequest({addresserId:data.id,requesterId:idUrSelf});
  }
  else{
    console.warn("ID UR SELF NOT FOUND");
  }
 }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Profile - Trải dài toàn màn hình */}
      <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {/* Cover Photo (Ảnh bìa) */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-16 md:-mt-20">
            {/* Avatar */}
            <div className="p-2 bg-white rounded-full shadow-lg">
              <img
                src={avatarUrl}
                alt="Profile Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white"
              />
            </div>

            {/* Tên và thông tin nhanh */}
            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{data.fullName}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <IdCard size={16} /> ID: {data.id}
                </span>
                {/* <span className="flex items-center gap-1">
                  <MapPin size={16} /> Cần Thơ, Việt Nam
                </span> */}
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {`Tham gia tháng ${jd.getMonth()+1}/${jd.getFullYear()}`}
                </span>
              </div>
            </div>

            {/* Nút hành động ở góc phải */}
            <div className="flex gap-3 mb-2 w-full md:w-auto">
              <button onClick={()=>send()} className="flex-1 md:flex-none flex items-center cursor-pointer justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                <UserPlus size={18} /> Kết bạn
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all active:scale-95">
                <MessageCircle size={18} /> Nhắn tin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bố cục 2 cột cho màn rộng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cột trái: Thông tin chi tiết (Chiếm 1 phần) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-left">Giới thiệu</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Họ tên</p>
                  <p className="text-sm font-medium text-gray-700">{data.fullName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Sinh nhật</p>
                  <p className="text-sm font-medium text-gray-700">{`${bd.getDate()}/${bd.getMonth()+1}/${bd.getFullYear()}`}</p>
                </div>
              </div>

              {/* <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Email</p>
                  <p className="text-sm font-medium text-gray-700">thaibao.it@example.com</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Cột phải: Hoạt động/Bài viết (Chiếm 2 phần) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
                <User size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-400 italic">Chưa có bài viết hay hoạt động nào gần đây.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}