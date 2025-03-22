import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import Link from "next/link";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <div className="flex justify-between items-center h-full px-4">
          <Link href="/">🏥 Clinic Booking</Link>
          <Link href="/user/profile">Tài khoản</Link>
        </div>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
