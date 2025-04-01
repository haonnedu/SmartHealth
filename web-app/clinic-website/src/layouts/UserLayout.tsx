import { Footer } from "@/components/Footer";
import { HeaderTabs } from "@/components/Header";
import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const headerHeight = isMobile ? 60 : 100;
  return (
    <AppShell header={{ height: 100 }} padding={0}>
      <AppShell.Header>
        <HeaderTabs />
      </AppShell.Header>

      <AppShell.Main className="p-0">
        <div
          className="flex flex-col"
          style={{
            minHeight: `100vh`,
            paddingTop: headerHeight,
          }}
        >
          <div className="flex-grow p-4">{children}</div>
          <Footer />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
