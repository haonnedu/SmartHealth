"use client";

import { Center, Loader, Text, Stack, Overlay } from "@mantine/core";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay = ({
  isLoading,
  message = "Processing...",
}: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <Overlay
      fixed
      center
      blur={2}
      zIndex={9999}
    >
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="xl" color="red" />
          <Text size="lg" fw={500} c="dimmed">
            {message}
          </Text>
        </Stack>
      </Center>
    </Overlay>
  );
};

export default LoadingOverlay;
