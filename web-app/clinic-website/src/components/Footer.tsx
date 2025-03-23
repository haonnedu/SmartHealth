// components/Footer.tsx
import { Container, Grid, Text, Anchor, Divider, Group } from "@mantine/core";

export function Footer() {
  return (
    <footer>
      <Divider my="md" />
      <Container size="xl" py="md">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text fw={700} size="lg">
              SmartHealth
            </Text>
            <Text size="sm" c="dimmed" mt="xs">
              Khám bệnh dễ dàng – An toàn – Nhanh chóng
            </Text>
            <Text size="sm" c="dimmed">
              Easy – Safe – Fast Health Checkup
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Text fw={600} mb="xs">
              Liên kết / Links
            </Text>
            <Anchor href="/booking" size="sm">
              Đặt lịch khám
            </Anchor>
            <Anchor href="/guide" size="sm">
              Hướng dẫn
            </Anchor>
            <Anchor href="/contact" size="sm">
              Liên hệ
            </Anchor>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Text fw={600} mb="xs">
              Liên hệ / Contact
            </Text>
            <Text size="sm">Hotline: 1900 6868</Text>
            <Text size="sm">Email: support@smarthealth.vn</Text>
            <Text size="sm">Địa chỉ: 123 Lê Lợi, TP.HCM</Text>
          </Grid.Col>
        </Grid>

        <Divider my="md" />

        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            © {new Date().getFullYear()} SmartHealth. All rights reserved.
          </Text>
          <Group gap="xs">
            <Anchor href="/terms" size="xs">
              Điều khoản
            </Anchor>
            <Anchor href="/privacy" size="xs">
              Chính sách bảo mật
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
