"use client"
export default function PrivateChatPage({ children }: { children: React.ReactNode}) {


  return (
    <div className="flex flex-col h-full bg-gray-50 "> 
      <main className="flex-1  p-4">
        {children}
      </main>

     
    </div>
  );
}