import { authApi } from "@/lib/auth/auth.api";
import { useAuth, useLogout } from "@/lib/auth/auth.hooks";
import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import {
  IconChevronDown,
  IconLogin,
  IconLogout,
  IconUser,
  IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Page", href: "/page" },
  { label: "Contact Us", href: "/contact" },
];

const languages = [
  { label: "EN", value: "en" },
  { label: "VI", value: "vi" },
];

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const { user, isAuthenticated } = useAuth();
  const { mutate: logout } = useLogout();
  return (
    <header
      className="shadow-sm border-b h-full"
      style={{ background: "linear-gradient(90deg, #fde4ec 0%, #e0e7ff 100%)" }}
    >
      <Container size="xl" className="py-7 md:py-4">
        <Group
          justify="space-between"
          align="center"
          wrap="nowrap"
          className="relative"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Health_care.png"
              alt="Logo"
              width={60}
              height={60}
              className="w-[60px] md:w-[80px]"
            />
            <Text fw={700} size="xl" className="text-pink-900 hidden sm:block">
              SmartHealth
            </Text>
          </Link>

          {/* Navigation - Hidden on mobile, shown on desktop */}
          <Group gap="lg" className="hidden md:flex mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-pink-700 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </Group>

          {/* CTA Button - Responsive sizing */}
          <Button
            component={Link}
            href="/booking"
            size="sm"
            radius="md"
            className="hidden sm:block font-semibold bg-pink-700 text-white hover:bg-pink-800 md:text-base text-sm"
          >
            Make an Appointment
          </Button>

          {/* Desktop User/Language Dropdown */}
          <Group gap="xs" className="hidden md:flex">
            {/* Language Selector */}
            <Menu shadow="md" width={120}>
              <Menu.Target>
                <ActionIcon variant="light" color="black"  size="lg">
                  <IconWorld size={20} />
                  <span className="ml-1 font-semibold">
                    {lang.toUpperCase()}
                  </span>
                  <IconChevronDown size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {languages.map((lng) => (
                  <Menu.Item key={lng.value} onClick={() => setLang(lng.value)}>
                    {lng.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            {/* User Dropdown */}
            <Menu shadow="md" width={180}>
              <Menu.Target>
                <Avatar color="black" radius="xl" className="cursor-pointer bg-pink-100">
                  <IconUser size={20} />
                </Avatar>
              </Menu.Target>
              <Menu.Dropdown>
                {isAuthenticated ? (
                  <Menu.Item
                    leftSection={<IconLogout size={16} />}
                    component={Link}
                    href=""
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    leftSection={<IconLogin size={16} />}
                    component={Link}
                    href={`/login?callbackUrl=${encodeURIComponent(
                      typeof window !== "undefined"
                        ? window.location.pathname
                        : ""
                    )}`}
                  >
                    Login
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              className="text-gray-700"
              variant="subtle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </Group>

        {/* Mobile Navigation Menu - Controlled by state */}
        {mobileMenuOpen && (
          <div className="border-radius-md bg-gradient-to-r from-blue-100 to-pink-100 md:hidden py-2 animate-fade-in opacity-90">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:text-pink-700 font-medium border-b border-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              component={Link}
              href="/booking"
              size="sm"
              radius="md"
              className="mx-4 mt-2 w-[calc(100%-32px)] font-semibold bg-pink-700 text-white hover:bg-pink-800 opacity-90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Make an Appointment
            </Button>
            {/* Mobile Language Selector */}
            <div className="flex gap-2 px-4 mt-2">
              {languages.map((lng) => (
                <Button
                  key={lng.value}
                  size="xs"
                  variant={lang === lng.value ? "filled" : "outline"}
                  color="pink"
                  onClick={() => setLang(lng.value)}
                  className="flex-1"
                >
                  {lng.label}
                </Button>
              ))}
            </div>
            {/* Mobile Login/Logout */}
            <Button
              component={Link}
              href={isAuthenticated ? "/logout" : "/login"}
              size="xs"
              variant="outline"
              color="pink"
              className="mx-4 mt-2 w-[calc(100%-32px)]"
              onClick={() => setMobileMenuOpen(false)}
              leftSection={
                isAuthenticated ? (
                  <IconLogout size={16} />
                ) : (
                  <IconLogin size={16} />
                )
              }
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}
