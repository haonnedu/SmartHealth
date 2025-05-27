import { Footer } from "@/components/Footer";
import MainHeader from "@/components/Header";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <MainHeader />
      </div>
      {/* Main Content with increased top padding */}
      <main className="flex-1 pt-[112px] bg-white">{children}</main>
      <Footer />
    </div>
  );
}
