'use client';


import { login } from '@/services/auth/LoginService';
import { LoginRequestType, LoginSchema } from '@/types/login/LoginRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  async function onLogin(loginInfo:LoginRequestType){
   try{
    const result = await login(loginInfo);
    router.push(`/${result?.role}`)
    localStorage.setItem("fullName",result?.fullName||"");
   }
   catch(err){
    if(err instanceof Error){
      toast.error(err.message)
    }
   }

  }
  const {register,formState:{errors},handleSubmit} = useForm<LoginRequestType>({
    resolver:zodResolver(LoginSchema)
  })
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 border border-slate-200">
        
        {/* Logo/Brand */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-blue-600 tracking-tight">SOCIALAPP</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Đăng nhập để kết nối với bạn bè.</p>
        </div>

        {/* Form UI */}
        <form onSubmit={handleSubmit(onLogin)} method='POST' className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
              placeholder="Nhập tên đăng nhập..."
              {...register("username")}
            />
           {errors.username &&  <small className='text-red-500'>{errors.username?.message}</small>}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mật khẩu
              </label>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <input
              type="password"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
              placeholder="••••••••"
              {...register("password")}
            />
           {errors.password &&  <small className='text-red-500'>{errors.password?.message}</small>}
          </div>

          <button className="w-full bg-slate-900 text-white py-3.5 rounded-lg font-bold hover:bg-slate-800 active:transform active:scale-[0.99] transition-all mt-2">
            ĐĂNG NHẬP
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-medium">Hoặc</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600">
          Bạn mới biết đến SocialApp?{' '}
          <Link href="/auth/register" className="text-blue-600 font-bold hover:underline">
            Tạo tài khoản mới
          </Link>
        </p>
      </div>
    </main>
  );
}