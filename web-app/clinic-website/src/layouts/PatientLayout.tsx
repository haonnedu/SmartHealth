import Header from "@/components/manage-site/header";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconDownload,
  IconHeartbeat,
  IconHome2,
  IconNotes,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

const navItems = [
  { label: "Dashboard", icon: IconHome2 },
  { 
    label: "My Appointments", 
    icon: IconCalendar, 
    href: "/patient/appointment"
  },
  { label: "OPD", icon: IconHeartbeat },
  { label: "Download Center", icon: IconDownload },
  { label: "Notes", icon: IconNotes },
];

interface PatientLayoutProps {
  children: ReactNode;
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  const [navbarOpened, { toggle }] = useDisclosure(true);
  const collapsed = !navbarOpened;
  const router = useRouter();
  const [title, setTitle] = useState("Patient Dashboard");
  const handleNavClick = (href: string, label: string) => {
    router.push(href);
    setTitle(label);
  };

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: collapsed ? 70 : 220,
        breakpoint: "sm",
        collapsed: { mobile: collapsed },
      }}
      header={{ height: 60 }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header withBorder>
        <Group justify="space-between" px="md" h="100%">
          <Group>
            <Burger
              lineSize={2}
              size="sm"
              opened={navbarOpened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
            <Header title={title} />
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar */}
      <AppShell.Navbar p="xs" className="bg-blue-500 text-white">
        <ScrollArea h="100%">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            return (
              <Tooltip
                label={item.label}
                position="right"
                withArrow
                disabled={!collapsed}
                key={item.label}
              >
                <NavLink
                  label={!collapsed ? item.label : undefined}
                  variant="light"
                  px={collapsed ? "sm" : "md"}
                  leftSection={<Icon size={16} stroke={1.5} />}
                  className={`hover:bg-blue-600 ${isActive ? 'bg-blue-700 text-white' : ''}`}
                  active={isActive}
                  onClick={() => handleNavClick(item.href || '', item.label)}
                />
              </Tooltip>
            );
          })}
        </ScrollArea>
      </AppShell.Navbar>

      {/* Main content */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
