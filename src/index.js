import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
