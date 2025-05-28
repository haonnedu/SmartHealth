// components/Footer.tsx
import {
  Container,
  Grid,
  Text,
  Title,
  Stack,
  Group,
  ActionIcon,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Link from "next/link";

const footerData = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "General Checkup", href: "/services/general-checkup" },
      { label: "Specialty Clinics", href: "/services/specialty-clinics" },
      { label: "Online Consultation", href: "/services/online-consultation" },
      { label: "Home Lab Tests", href: "/services/home-lab-tests" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-auto">
      <Container size="xl">
        <Grid>
          {/* Brand and Description */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack>
              <Title order={4} className="text-pink-700">
                SmartHealth
              </Title>
              <Text size="sm" c="dimmed" className="max-w-xs">
                Empowering healthcare through innovative technology solutions
                for a healthier tomorrow.
              </Text>
              {/* Social Links */}
              <Group gap="xs" mt="md">
                <ActionIcon size="lg" variant="light" radius="xl" color="pink">
                  <IconBrandTwitter size={18} />
                </ActionIcon>
                <ActionIcon size="lg" variant="light" radius="xl" color="pink">
                  <IconBrandYoutube size={18} />
                </ActionIcon>
                <ActionIcon size="lg" variant="light" radius="xl" color="pink">
                  <IconBrandInstagram size={18} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Footer Links */}
          {footerData.map((group) => (
            <Grid.Col key={group.title} span={{ base: 12, md: 3 }}>
              <Stack>
                <Title order={5}>{group.title}</Title>
                <Stack gap="xs">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-gray-600 hover:text-pink-700 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col>
          ))}
        </Grid>

        {/* Bottom Bar */}
        <Text c="dimmed" size="sm" ta="center" mt={50}>
          © {new Date().getFullYear()} SmartHealth. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
