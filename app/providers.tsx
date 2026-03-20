"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "@/app/contexts/SearchContext";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Instanciamos o QueryClient dentro do useState para garantir que ele não 
  // seja recriado a cada renderização do componente.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        {children}
      </SearchProvider>
    </QueryClientProvider>
  );
}