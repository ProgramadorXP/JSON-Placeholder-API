import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

//Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Router />
    </StrictMode>
  </QueryClientProvider>
);
