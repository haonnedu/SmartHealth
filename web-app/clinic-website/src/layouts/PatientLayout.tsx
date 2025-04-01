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
import { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", icon: IconHome2 },
  { label: "My Appointments", icon: IconCalendar },
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
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar */}
      <AppShell.Navbar p="xs">
        <ScrollArea h="100%">
          {navItems.map((item) => {
            const Icon = item.icon;
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
