import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { HeaderTabs } from "@/components/Header";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 100 }}>
      <AppShell.Header>
        <HeaderTabs />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
