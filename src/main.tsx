import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// سنضيف هذه السطور لضمان عمل التنبيهات والطلبات في التطبيق
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>
);
