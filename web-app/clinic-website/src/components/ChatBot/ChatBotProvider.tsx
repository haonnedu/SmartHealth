import { createContext, useContext, ReactNode } from "react";
import { ChatBot } from "./ChatBot";

interface ChatBotContextType {
  // Future: Add global chatbot state management here
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export function useChatBot() {
  const context = useContext(ChatBotContext);
  if (context === undefined) {
    throw new Error("useChatBot must be used within a ChatBotProvider");
  }
  return context;
}

interface ChatBotProviderProps {
  children: ReactNode;
}

export function ChatBotProvider({ children }: ChatBotProviderProps) {
  const value: ChatBotContextType = {
    // Future: Add global chatbot state here
  };

  return (
    <ChatBotContext.Provider value={value}>
      {children}
      <ChatBot />
    </ChatBotContext.Provider>
  );
}
