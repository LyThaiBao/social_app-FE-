export default function Typing({memberName}:{memberName:string}){
    
    return <div className="flex justify-start w-full px-4 mb-5">
        <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
            <span className="text-xs text-gray-500 font-medium ml-1">
            {memberName} đang soạn
            </span>
        </div>
    </div>
}