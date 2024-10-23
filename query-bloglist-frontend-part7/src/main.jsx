import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/NotificationContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <NotificationContextProvider>
        <Router>
          <MantineProvider>
            <App />
          </MantineProvider>
        </Router>
      </NotificationContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);
