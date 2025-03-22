import { AppShell, NavLink } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AppShell
      padding="md"
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: false },
      }}
      header={{ height: 60 }}
    >
      <AppShell.Header>Admin Dashboard</AppShell.Header>
      <AppShell.Navbar>
        <NavLink label="Dashboard" component={Link} href="/admin" />
        <NavLink label="Lịch hẹn" component={Link} href="/admin/appointments" />
        <NavLink label="Bác sĩ" component={Link} href="/admin/doctors" />
        <NavLink label="Bệnh nhân" component={Link} href="/admin/patients" />
        <NavLink label="Cài đặt" component={Link} href="/admin/settings" />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
