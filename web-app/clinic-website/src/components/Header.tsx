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
  UnstyledButton,
  rem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconLogin,
  IconLogout,
  IconUser,
  IconWorld,
  IconMenu2,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Contact", href: "/contact" },
];

const languages = [
  { label: "English", value: "en" },
  { label: "Tiếng Việt", value: "vi" },
];

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const { user, isAuthenticated } = useAuth();
  const { mutate: logout } = useLogout();
  const { tenantTheme, isThemeChanging } = useTheme();

  return (
    <header>
      <Container size="xl" className="h-20">
        <Group justify="space-between" h="100%">
          {/* Logo */}
          <UnstyledButton
            component={Link}
            href="/"
            className="flex items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="relative w-12 h-12 transition-opacity duration-300 ease-in-out">
              <Image
                src={tenantTheme.logo || "/images/Health_care.png"}
                alt={tenantTheme.brandName}
                width={48}
                height={48}
                className="w-12 h-12 transition-all duration-300 ease-in-out"
                style={{
                  opacity: isThemeChanging ? 0 : 1,
                  transform: isThemeChanging ? "scale(0.9)" : "scale(1)",
                }}
              />
            </div>
            <Text
              fw={700}
              size="lg"
              className={`hidden sm:block text-${tenantTheme.primaryColor}-700 transition-all duration-300 ease-in-out`}
              style={{
                opacity: isThemeChanging ? 0 : 1,
                transform: isThemeChanging
                  ? "translateY(5px)"
                  : "translateY(0)",
              }}
            >
              {tenantTheme.brandName}
            </Text>
          </UnstyledButton>

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="md">
            {navLinks.map((link) => (
              <UnstyledButton
                key={link.href}
                component={Link}
                href={link.href}
                className={`text-gray-700 hover:text-${tenantTheme.primaryColor}-700 font-medium transition-colors`}
              >
                {link.label}
              </UnstyledButton>
            ))}
          </Group>

          {/* Right Section */}
          <Group gap="md">
            {/* Language Selector */}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  <IconWorld size={20} stroke={1.5} />
                  <Text size="sm" fw={500}>
                    {lang === "en" ? "English" : "Tiếng Việt"}
                  </Text>
                  <IconChevronDown size={16} stroke={1.5} />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {languages.map((lng) => (
                  <Menu.Item
                    key={lng.value}
                    onClick={() => setLang(lng.value)}
                    className={
                      lang === lng.value
                        ? `bg-${tenantTheme.primaryColor}-50`
                        : ""
                    }
                  >
                    {lng.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Avatar
                      size="sm"
                      color={tenantTheme.primaryColor}
                      radius="xl"
                      className={`bg-${tenantTheme.primaryColor}-100`}
                    >
                      <IconUser size={rem(16)} stroke={1.5} />
                    </Avatar>
                    <Text size="sm" fw={500} className="hidden sm:block">
                      {user?.username || "User"}
                    </Text>
                    <IconChevronDown
                      size={16}
                      className="hidden sm:block"
                      stroke={1.5}
                    />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    component={Link}
                    href="/profile"
                    leftSection={<IconUser size={16} stroke={1.5} />}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={16} stroke={1.5} />}
                    onClick={() => logout()}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Group gap="sm">
                <Button
                  component={Link}
                  href="/login"
                  variant="light"
                  color="gray"
                  size="sm"
                  className="hidden sm:block"
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  href="/register"
                  size="sm"
                  className="hidden sm:block"
                  variant="filled"
                  color={tenantTheme.primaryColor}
                >
                  Sign Up
                </Button>
              </Group>
            )}

            {/* Book Appointment Button */}
            <Button
              component={Link}
              href="/booking"
              variant="gradient"
              gradient={{ from: tenantTheme.primaryColor, to: "violet" }}
              size="sm"
              className="hidden sm:block"
            >
              Book Appointment
            </Button>

            {/* Mobile Menu Button */}
            <ActionIcon
              variant="subtle"
              hiddenFrom="md"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              size="lg"
            >
              <IconMenu2 size={24} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-x-0 top-20 bg-white border-t border-b border-gray-200 shadow-lg md:hidden animate-fade-down animate-duration-200`}
        >
          <Container size="xl" py="md">
            <div className="flex flex-col gap-4">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <UnstyledButton
                  key={link.href}
                  component={Link}
                  href={link.href}
                  className={`py-2 px-4 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </UnstyledButton>
              ))}

              {/* Auth Buttons */}
              {!isAuthenticated && (
                <Group grow>
                  <Button
                    component={Link}
                    href="/login"
                    variant="light"
                    color="gray"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                  <Button
                    component={Link}
                    href="/register"
                    variant="filled"
                    color={tenantTheme.primaryColor}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Group>
              )}

              {/* Book Appointment Button */}
              <Button
                component={Link}
                href="/booking"
                variant="gradient"
                gradient={{ from: tenantTheme.primaryColor, to: "violet" }}
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Appointment
              </Button>

              {/* Language Selector */}
              <Group grow>
                {languages.map((lng) => (
                  <Button
                    key={lng.value}
                    variant={lang === lng.value ? "filled" : "light"}
                    color={tenantTheme.primaryColor}
                    onClick={() => {
                      setLang(lng.value);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {lng.label}
                  </Button>
                ))}
              </Group>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
