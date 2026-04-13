import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
          Connect <span className="text-blue-600">Instantly.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
          Trải nghiệm nền tảng mạng xã hội thời gian thực thế hệ mới. 
          Nhắn tin, chia sẻ và kết nối không giới hạn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/auth/login" 
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Đăng nhập
          </Link>
          <Link 
            href="/auth/register" 
            className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-all"
          >
            Đăng ký tài khoản
          </Link>
        </div>
      </div>
    </main>
  );
}