import { useState, useRef, useEffect } from "react";
import {
  Paper,
  TextInput,
  Button,
  Stack,
  ScrollArea,
  Text,
  Box,
  Alert,
  ActionIcon,
  Transition,
  Group,
  Avatar,
  Tooltip,
  Divider,
  Badge,
} from "@mantine/core";
import {
  IconSend,
  IconRobot,
  IconAlertCircle,
  IconMessageCircle,
  IconX,
  IconMinus,
  IconUser,
} from "@tabler/icons-react";
import { useTheme } from "@/providers/ThemeProvider";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { tenantTheme } = useTheme();

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: `bot-welcome-${Date.now()}`,
        text: "Hello! I'm your medical assistant. I can help answer your health questions. Please remember that I provide general information only - always consult with a healthcare professional for medical advice.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Update unread count when new bot message arrives and chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.isBot && lastMessage.id !== `bot-welcome-${Date.now()}`) {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [messages, isOpen]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? "Please wait a moment before sending another message."
            : "Failed to get response"
        );
      }

      const data = await response.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: data.response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleChat = () => {
    if (isMinimized) {
      // If minimized, restore the chat
      setIsMinimized(false);
    } else if (isOpen) {
      // If open and not minimized, close it
      setIsOpen(false);
    } else {
      // If closed, open it
      setIsOpen(true);
    }
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Chat Toggle Button
  const ChatToggleButton = () => (
    <Tooltip label="Medical Assistant" position="left" withArrow>
      <ActionIcon
        size={60}
        radius="xl"
        variant="filled"
        onClick={handleToggleChat}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          background: "linear-gradient(135deg, #e91e63, #ad1457)",
          color: "white",
          border: "3px solid white",
          boxShadow:
            "0 8px 32px rgba(233, 30, 99, 0.4), 0 4px 16px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
        className="hover:scale-110"
      >
        <Box style={{ position: "relative" }}>
          <IconMessageCircle size={28} />
          {unreadCount > 0 && (
            <Badge
              size="xs"
              color="red"
              variant="filled"
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                minWidth: 18,
                height: 18,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ff4757",
                color: "white",
                border: "2px solid white",
              }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Box>
      </ActionIcon>
    </Tooltip>
  );

  return (
    <>
      {/* Chat Toggle Button - Show when chat is closed OR minimized */}
      {(!isOpen || isMinimized) && <ChatToggleButton />}

      {/* Chat Window */}
      <Transition
        mounted={isOpen}
        transition="slide-up"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Paper
            shadow="xl"
            radius="lg"
            style={{
              ...styles,
              position: "fixed",
              bottom: isMinimized ? -440 : 20, // Hide completely when minimized
              right: 20,
              width: 380,
              height: isMinimized ? 60 : 500,
              zIndex: 999, // Lower than toggle button when minimized
              overflow: "hidden",
              transition: "all 0.3s ease",
              border: `1px solid #e9ecef`,
              opacity: isMinimized ? 0 : 1, // Make invisible when minimized
              pointerEvents: isMinimized ? "none" : "auto", // Disable interactions when minimized
            }}
          >
            {/* Chat Header */}
            <Box
              p="md"
              style={{
                background: `linear-gradient(135deg, var(--mantine-color-${tenantTheme.primaryColor}-6), var(--mantine-color-${tenantTheme.primaryColor}-7))`,
                color: "white",
                cursor: isMinimized ? "pointer" : "default",
              }}
              onClick={isMinimized ? () => setIsMinimized(false) : undefined}
            >
              <Group justify="space-between">
                <Group gap="sm">
                  <Avatar size="sm" color="white" variant="light">
                    <IconRobot size={18} />
                  </Avatar>
                  <Box>
                    <Text size="sm" fw={600}>
                      Medical Assistant
                    </Text>
                    <Text size="xs" style={{ opacity: 0.8 }}>
                      {isLoading ? "Typing..." : "Online"}
                    </Text>
                  </Box>
                </Group>
                <Group gap="xs">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="white"
                    onClick={handleMinimize}
                  >
                    <IconMinus size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="white"
                    onClick={handleClose}
                  >
                    <IconX size={16} />
                  </ActionIcon>
                </Group>
              </Group>
            </Box>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <ScrollArea
                  style={{ flex: 1, height: 350 }}
                  viewportRef={scrollAreaRef}
                  p="md"
                >
                  <Stack gap="md">
                    {messages.map((message) => (
                      <Box key={message.id}>
                        <Group
                          gap="sm"
                          align="flex-start"
                          justify={message.isBot ? "flex-start" : "flex-end"}
                        >
                          {message.isBot && (
                            <Avatar
                              size="sm"
                              color={tenantTheme.primaryColor}
                              variant="light"
                            >
                              <IconRobot size={14} />
                            </Avatar>
                          )}
                          <Box style={{ maxWidth: "80%" }}>
                            <Paper
                              p="sm"
                              radius="lg"
                              style={{
                                backgroundColor: message.isBot
                                  ? "#f8f9fa"
                                  : `var(--mantine-color-${tenantTheme.primaryColor}-6)`,
                                color: message.isBot ? "#495057" : "white",
                                marginLeft: message.isBot ? 0 : "auto",
                                borderBottomLeftRadius: message.isBot ? 4 : 16,
                                borderBottomRightRadius: message.isBot ? 16 : 4,
                              }}
                            >
                              <Text size="sm" style={{ lineHeight: 1.4 }}>
                                {message.text}
                              </Text>
                            </Paper>
                            <Text
                              size="xs"
                              c="dimmed"
                              ta={message.isBot ? "left" : "right"}
                              mt={4}
                            >
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Text>
                          </Box>
                          {!message.isBot && (
                            <Avatar size="sm" color="gray" variant="light">
                              <IconUser size={14} />
                            </Avatar>
                          )}
                        </Group>
                      </Box>
                    ))}
                    {isLoading && (
                      <Group gap="sm" align="flex-start">
                        <Avatar
                          size="sm"
                          color={tenantTheme.primaryColor}
                          variant="light"
                        >
                          <IconRobot size={14} />
                        </Avatar>
                        <Paper
                          p="sm"
                          radius="lg"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <Text size="sm" c="dimmed">
                            <span className="animate-pulse">●</span>
                            <span
                              className="animate-pulse"
                              style={{ animationDelay: "0.2s" }}
                            >
                              ●
                            </span>
                            <span
                              className="animate-pulse"
                              style={{ animationDelay: "0.4s" }}
                            >
                              ●
                            </span>
                          </Text>
                        </Paper>
                      </Group>
                    )}
                  </Stack>
                </ScrollArea>

                <Divider />

                {/* Error Alert */}
                {error && (
                  <Alert
                    icon={<IconAlertCircle size={16} />}
                    color="red"
                    variant="light"
                    m="sm"
                    styles={{ root: { fontSize: "12px" } }}
                  >
                    {error}
                  </Alert>
                )}

                {/* Chat Input */}
                <Box p="md">
                  <Group gap="sm" align="flex-end">
                    <TextInput
                      placeholder="Type your medical question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      style={{ flex: 1 }}
                      disabled={isLoading}
                      radius="xl"
                      size="sm"
                    />
                    <ActionIcon
                      onClick={handleSend}
                      loading={isLoading}
                      disabled={!input.trim() || isLoading}
                      color={tenantTheme.primaryColor}
                      size="lg"
                      radius="xl"
                      variant="filled"
                    >
                      <IconSend size={16} />
                    </ActionIcon>
                  </Group>
                  <Text size="xs" c="dimmed" ta="center" mt="xs">
                    Always consult healthcare professionals for medical advice
                  </Text>
                </Box>
              </>
            )}
          </Paper>
        )}
      </Transition>
    </>
  );
}
