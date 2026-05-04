

export default function NotifiEmpty(){

    return <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
    <div className="relative mb-8">
        <div className="absolute -inset-4 bg-yellow-200 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        <div className="relative w-32 h-32 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-black">
            <span className="text-6xl animate-bounce">📭</span>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 border-4 border-black rounded-full flex items-center justify-center text-white font-black text-sm">
                0
            </div>
        </div>
        <span className="absolute -top-4 -left-4 text-2xl">✨</span>
        <span className="absolute -bottom-2 -right-6 text-2xl animate-spin-slow">🌈</span>
    </div>

    <h3 className="text-2xl font-black text-black tracking-tight mb-3">
        TỊNH TÂM QUÁ BẠN ƠI!
    </h3>
    <p className="text-gray-600 font-medium max-w-[280px] leading-relaxed">
        Hộp thư đang "trống rỗng" như ví tiền của bạn vậy. Đi tương tác dạo đi nào! 🏃‍♂️💨
    </p>

    <button className="mt-10 px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl border-b-4 border-r-4 border-black hover:translate-x-[2px] hover:translate-y-[2px] hover:border-b-2 hover:border-r-2 transition-all active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        ĐI KIẾM CHUYỆN NÈ! 🚀
    </button>

    <style jsx>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
    `}</style>
</div>
}