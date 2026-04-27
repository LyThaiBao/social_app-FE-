import { MessageResponse } from "@/types/message/messageResponse"


interface BoxDetailProps{
    setBoxDetail:(value:boolean)=>void,
    messageDetail:MessageResponse|null
}
export default function BoxDetail({setBoxDetail,messageDetail}:BoxDetailProps){
    return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 " >
        <div className="bg-[#fff] text-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="font-bold text-lg text-black">Message status</h2>
                <button onClick={()=>setBoxDetail(false)} className="bg-gray-700/50 p-2 rounded-full hover:bg-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="p-5">
                <div className="flex gap-3">
                    <div className="flex-1 bg-[#fff] p-4 rounded-xl border border-gray-700 space-y-3">
                        <p className="text-xs text-gray-400 font-semibold">{messageDetail?.senderName}</p>
                        <div className="flex items-center gap-3 bg-[#fff] p-2 rounded-lg border border-gray-800">
                            <div className="border-l-2 border-blue-500 h-10"></div>                            
                            <p className="text-sm text-black truncate w-[400px]">
                               {messageDetail?.content|| messageDetail?.mediaUrl}
                            </p>
                        </div>
                        <div className="text-right text-xs text-gray-500 pt-2 flex items-center justify-end gap-1">
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                            {messageDetail?.sentTime}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}