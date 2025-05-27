"use client";

import { useLoadingState } from "@/hooks/useLoadingState";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ReactNode } from "react";

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const { isLoading, message } = useLoadingState();

  return (
    <>
      {children}
      <LoadingOverlay isLoading={isLoading} message={message} />
    </>
  );
};

export default LoadingProvider;
