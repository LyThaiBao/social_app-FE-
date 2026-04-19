import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";


export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="max-w-10xl mx-auto pt-20 px-4 flex gap-6">
        {/* Sidebar đã được tách ra */}
        <Sidebar />

        <main className="flex-1 pb-10 ">
          {children}
        </main>
      </div>
    </div>
  );
}