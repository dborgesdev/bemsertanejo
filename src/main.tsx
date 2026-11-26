import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppErrorBoundary } from "./components/ui/AppErrorBoundary";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");

const queryClient = new QueryClient();

createRoot(root).render(
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppErrorBoundary>,
);
