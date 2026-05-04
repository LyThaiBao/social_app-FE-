'use client';

import { registerMember } from '@/services/auth/registerService';
import { RegisterRequestForm, RegisterRequestType, RegisterSchema } from '@/types/register/registerRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const {register,handleSubmit,formState:{errors}} = useForm<RegisterRequestForm>({
    resolver:zodResolver(RegisterSchema), // Hoặc một giá trị mặc định hợp lệ
    
  })

  async function onRegister(registerInfo:RegisterRequestForm){
    const info:RegisterRequestType = {birthDay:registerInfo.birthDay, fullName:registerInfo.fullName,password:registerInfo.password,username:registerInfo.username}
    try{
      const a = await registerMember(info);
      console.log(a)
      toast.success("Tạo tài khoản thành công")
      router.replace("login")
    }
    catch(err){
      if(err instanceof Error){
        toast.error(err.message)
      }
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-sm p-8 border border-slate-200">
        
        {/* Logo/Brand */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-blue-600 tracking-tight">SOCIALAPP</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Tham gia cộng đồng SocialApp ngay hôm nay!</p>
        </div>

        {/* Form UI */}
        <form onSubmit={handleSubmit(onRegister)} className="space-y-6">
          
          {/* Grid cho Họ và Tên */}
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Họ Tên
              </label>
              <input
                type="text"
                
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
                placeholder="Nguyễn Van A"
                {...register("fullName")}
              />
              <small className='text-red-500'>{errors.fullName?.message}</small>
            </div>
          </div>

          <div className='flex  gap-5 text-xs font-bold text-slate-700 uppercase tracking-wider my-5'>

            <label htmlFor="">Ngày Sinh</label>
            <input type="date"  {...register("birthDay")}/>
                <small className='text-red-500'>{errors.birthDay?.message}</small>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
              placeholder="van_bao_99"
              {...register("username")}
            />
              <small className='text-red-500'>{errors.username?.message}</small>
            <p className="text-xs text-slate-400 mt-1.5 ml-1">Đây là tên duy nhất dùng để chat và đăng nhập.</p>
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
              placeholder="••••••••••••"
              {...register("password")}
            />
                <small className='text-red-500'>{errors.password?.message}</small>
          </div>

          {/* Xác nhận Mật khẩu */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Xác nhận Mật khẩu
            </label>
            <input
              type="password"
              
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
              placeholder="••••••••••••"
              {...register("confirmPass")}
            />
            <small className='text-red-500'>{errors.confirmPass?.message}</small>
          </div>

          {/* Điều khoản */}
          <div className="flex items-start">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label className="ml-2 text-sm text-slate-600">
              Tôi đồng ý với <a href="#" className="font-semibold text-blue-600 hover:underline">Điều khoản</a> và <a href="#" className="font-semibold text-blue-600 hover:underline">Chính sách bảo mật</a> của SocialApp.
            </label>
          </div>

          {/* Nút Đăng ký */}
          <button className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 active:transform active:scale-[0.99] transition-all mt-4 shadow-lg shadow-blue-100">
            ĐĂNG KÝ TÀI KHOẢN
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-10">
          Đã có tài khoản?{' '}
          <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </main>
  );
}