import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NotificationContextProvider } from "../contexts/NotificationContext.jsx";
import { AuthContextProvider } from "../contexts/AuthContext.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const queryClient = new QueryClient();

export const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <NotificationContextProvider>
          <MantineProvider>{children}</MantineProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};
