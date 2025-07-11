import Header from "@/components/manage-site/header";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import {
  IconCalendar,
  IconDownload,
  IconHeartbeat,
  IconHome2,
  IconList,
  IconNotes,
  IconPlus,
  IconBuilding,
  IconBriefcase,
  IconUsers,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { ThemedContainer } from "@/components/ui/themed-container";
import { useTheme } from "@/providers/ThemeProvider";

interface AdminLayoutProps {
  children: ReactNode;
}
type NavItem = {
  label: string;
  icon?: any;
  href?: string;
  children?: NavItem[];
};
const navItems = [
  { label: "Dashboard", icon: IconHome2, href: "/admin/" },
  {
    label: "Appointments",
    icon: IconCalendar,
    href: "/admin/appointment",
  },
  {
    label: "Human Resource",
    icon: IconUsers,
    children: [
      {
        label: "Staff List",
        icon: IconList,
        href: "/admin/hr/list",
      },
      {
        label: "Staff Entry",
        icon: IconPlus,
        href: "/admin/hr/entry",
      },
    ],
  },
  { label: "OPD", icon: IconHeartbeat, href: "/admin/opd" },
  {
    label: "Download Center",
    icon: IconDownload,
    href: "/admin/download-center",
  },
  {
    label: "Master Data",
    icon: IconNotes,
    children: [
      {
        label: "Human Resource",
        icon: IconUsers,
        children: [
          {
            label: "Leave Type",
            icon: IconCalendar,
            href: "/admin/master-data/human-resource/leave-type",
          },
          {
            label: "Department",
            icon: IconBuilding,
            href: "/admin/master-data/department",
          },
          {
            label: "Designation",
            icon: IconBriefcase,
            href: "/admin/master-data/designation",
          },
          
          
        ],
      },
      {
        label: "Master Data",
        icon: IconPlus,
        href: "/admin/master-data",
      },
    ],
  },
];
export default function AdminLayout({ children }: AdminLayoutProps) {
  const [navbarOpened, { toggle }] = useDisclosure(true);
  const collapsed = !navbarOpened;
  const router = useRouter();
  const [title, setTitle] = useState("Admin Dashboard");
  const handleNavClick = (href: string, label: string) => {
    router.push(href);
    setTitle(label);
  };

  const renderNavItems = (items: NavItem[], collapsed = false) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive = router.pathname === item.href;
      const { themeColor } = useTheme();

      return (
        <Tooltip
          label={item.label}
          position="right"
          withArrow
          disabled={!collapsed}
          key={item.label}
        >
          <NavLink
            key={item.label}
            label={!collapsed ? item.label : undefined}
            leftSection={Icon ? <Icon size={16} stroke={1.5} /> : undefined}
            childrenOffset={collapsed ? 12 : 24}
            defaultOpened={
              item.children &&
              item.children.some((child) =>
                router.pathname.startsWith(child.href || "")
              )
            }
            className={`hover:bg-${themeColor}-600 ${
              isActive ? `bg-${themeColor}-700` : ""
            }`}
            onClick={
              item.href
                ? () => handleNavClick(item.href || "", item.label)
                : undefined
            }
          >
            {item.children && renderNavItems(item.children, collapsed)}
          </NavLink>
        </Tooltip>
      );
    });
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
      <AppShell.Navbar p="xs">
        <ThemedContainer variant="navbar" className="h-full border-2">
          <ScrollArea h="100%">
            {renderNavItems(navItems, collapsed)}
          </ScrollArea>
        </ThemedContainer>
      </AppShell.Navbar>

      {/* Main content */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
