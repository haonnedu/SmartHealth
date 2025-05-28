import { Footer } from "@/components/Footer";
import MainHeader from "@/components/Header";
import { ReactNode } from "react";
import { Container, Box } from "@mantine/core";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <Box className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Fixed Header */}
      <Box
        className="fixed top-0 left-0 w-full z-50"
          style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          borderBottom: "1px solid #e5e7eb",
          }}
        >
        <MainHeader />
      </Box>

      {/* Main Content */}
      <Box component="main" className="flex-1 pt-[112px]">
        <Container size="xl" px="md" py="xl">
          {children}
        </Container>
      </Box>

      {/* Footer */}
          <Footer />
    </Box>
  );
}
