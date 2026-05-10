  "use client"
  import { FriendStatus } from "@/enums/friendStatus";
import { findOrCreateConversation } from "@/services/conversation/findOrCreateConversation";
  import { acceptRequest } from "@/services/friendShip/accept";
  import { cancelRequest } from "@/services/friendShip/cancelRequest";
  import { denieRequest } from "@/services/friendShip/denie";
  import { sendRequest } from "@/services/friendShip/sendRequest";
  import { unfriend } from "@/services/friendShip/unfriend";
  import { FriendShipDetail } from "@/types/friendShip/friendShipDetail";
  import { FriendShipRequest } from "@/types/friendShip/sendRequest";
  import { MeResponse } from "@/types/me/meResponse";
  import { Calendar, IdCard, TicketX,Handshake, User, MessageCircle, UserPlus,UserPen,UserMinus,MessageCircleX } from "lucide-react";
  import { useRouter } from "next/navigation";
  interface MemberProfileProps {
    data: {
      id: number;
      fullName: string;
      birthDay: Date;
      joinDay:Date;
    },
    me:MeResponse,
    friendship:FriendShipDetail

  }

  export default function MemberProfileWide({ data,me,friendship }: MemberProfileProps) {
    const avatarUrl = `https://ui-avatars.com/api/?name=${data.fullName.replace(" ", "+")}&background=0D8ABC&color=fff&size=200`;
    const bd = new Date(data.birthDay);
    const jd = new Date(data.joinDay);
    const router = useRouter();
    //----------------Send request add Friend ----------------------
  async function addFriend(){
    console.log("ADDFR")
      await sendRequest({requesterId:me.memberId,addresserId:data.id});
  }

  async function denie(fshInfo:FriendShipRequest){
    await denieRequest({addresserId:fshInfo.addresserId,requesterId:fshInfo.requesterId});
    router.refresh();
  }

  async function accept(fshInfo:FriendShipRequest){
    await acceptRequest({requesterId:fshInfo.requesterId,addresserId:fshInfo.addresserId});
  }

  async function cancel(fshInfo:FriendShipRequest){
    await cancelRequest({requesterId:fshInfo.requesterId,addresserId:fshInfo.addresserId});
  }

  async function unFriend(fshInfo:FriendShipRequest){
    console.log("Cancel")
    await unfriend({requesterId:fshInfo.requesterId,addresserId:fshInfo.addresserId});
  }

  function modify(){
    router.push("me")
  }

  async function onChat(){
    // kiem tra xem co conversation chua, neu chua thì tao moi --> navigation
    const cvn = await findOrCreateConversation({partnerId:data.id})
    router.push(`chat/private/${cvn.conversationId}`)
  }

  //---------------verify relative of me and this member -----------navigation
  //data: this profile member
  //me: current login user 
      // PENDING,
      // DENIED,
      // ACCEPTED
  function verifyRelative(info:MemberProfileProps){
    if(info.data.id == me.memberId){
      return "Chỉnh sửa"
    }
    if(info.friendship.id == null ||info.friendship.friendShipType.toString() === FriendStatus[1].toString()){
      return "Gửi kết bạn"
    }

    if(info.friendship.friendShipType.toString() === FriendStatus[2].toString()){
      return "Hủy kết bạn"
    }

    
    if(info.friendship.addresserId == me.memberId){
      console.log("ME");
      return "Chấp nhận"
    }
    if(info.friendship.friendShipType.toString() === FriendStatus[0].toString()){
        return "Hủy yêu cầu"
    }
    
  }

  const relative = verifyRelative({data,me,friendship});

  async function onHandle(info:MemberProfileProps){
    const currentAction = verifyRelative({data,me,friendship});
    switch(currentAction){
      case "Chấp nhận":
        await accept({addresserId:info.friendship.addresserId,requesterId:info.friendship.requesterId});
        break;
      case "Hủy kết bạn":
        await unFriend({addresserId:info.friendship.addresserId,requesterId:info.friendship.requesterId});
        break;
      case "Chỉnh sửa":
        modify();
        break;
      case "Gửi kết bạn":
        await addFriend();
        break;
      case "Hủy yêu cầu":
        await cancel({addresserId:info.friendship.addresserId,requesterId:info.friendship.requesterId});  
        break;
        
    }
    router.refresh();

    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Profile - Trải dài toàn màn hình */}
        <div className="relative bg-white dark:bg-gray-800 dark:text-white  text-gray-900 rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
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

            
              <div className="flex-1 mb-2">
                <h1 className="text-3xl font-bold ">{data.fullName}</h1>
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
              {/* --------Denie--------- */}
              <div className="flex gap-3 mb-2 w-full md:w-auto">
              {relative === "Chấp nhận" &&  
                <button onClick={()=>denie({requesterId:friendship.requesterId,addresserId:friendship.addresserId})} className="flex-1 md:flex-none flex items-center cursor-pointer justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                  <TicketX size={18} /> Từ chối 
                </button>
              }
              {/* -----Accept-------- */}
              {relative === "Chấp nhận" &&  
                <button onClick={()=>onHandle({data,me,friendship})} className="flex-1 md:flex-none flex items-center cursor-pointer justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                  <Handshake size={18} /> Chấp Nhận
                </button>
              }

              {/* ----- Modify-------*/}
                {relative === "Chỉnh sửa" &&  
                <button onClick={()=>onHandle({data,me,friendship})} className="flex-1 md:flex-none flex items-center cursor-pointer justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                  <UserPen size={18} /> Chỉnh sửa
                </button>
              }

              
              {/*Add friend */}
                {relative === "Gửi kết bạn" &&  
                <button onClick={()=>onHandle({data,me,friendship})} className="flex-1 md:flex-none flex items-center cursor-pointer justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                  <UserPlus size={18} /> Kết bạn
                </button>
              }

              {/*  Unfriend */}
                {relative === "Hủy kết bạn" &&  
                <button onClick={()=>onHandle({data,me,friendship})} className="flex-1 md:flex-none flex items-center cursor-pointer justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                  <UserMinus size={18} /> Hủy kết bạn
                </button>
              }
                      {/* Cancel request */}
                {relative === "Hủy yêu cầu" &&  
                <button onClick={()=>onHandle({data,me,friendship})} className="flex-1 md:flex-none flex items-center cursor-pointer justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">
                  <MessageCircleX size={18} /> Hủy yêu cầu
                </button>
              }
                
              {relative === "Hủy kết bạn" &&   <button onClick={()=>onChat()} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all active:scale-95">
                  <MessageCircle size={18} /> Nhắn tin
                </button>}
              </div>
            </div>
          </div>
        </div>

        {/* Bố cục 2 cột cho màn rộng */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cột trái: Thông tin chi tiết (Chiếm 1 phần) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 text-left">Giới thiệu</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-blue-600  rounded-lg">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400  font-bold uppercase tracking-tighter">Họ tên</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-white">{data.fullName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Sinh nhật</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-white">{`${bd.getDate()}/${bd.getMonth()+1}/${bd.getFullYear()}`}</p>
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 h-full min-h-[300px] flex items-center justify-center">
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