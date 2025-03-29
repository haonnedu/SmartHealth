import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { HeaderTabs } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useMediaQuery } from "@mantine/hooks";

export default function UserLayout({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const headerHeight = isMobile ? 60 : 100;
  return (
    <AppShell header={{ height: 100 }} padding={0}>
      <AppShell.Header>
        <HeaderTabs />
      </AppShell.Header>

      <AppShell.Main className="p-0">
        <div className="h-[calc(100vh-100px)] overflow-y-auto flex flex-col">
          <div className="flex-grow p-4">{children}</div>
          <Footer />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
