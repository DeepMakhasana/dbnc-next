"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * (60 * 1000),
      gcTime: 60 * (60 * 1000),
      refetchOnWindowFocus: false, // Disable refetching on window focus
      refetchOnMount: false, // Disable refetching on mount
      retry: 3, // Retry failed requests up to 3 times
      retryDelay: 2000, // 2-second delay between retries
    },
  },
});

const TanstackProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackProvider;
