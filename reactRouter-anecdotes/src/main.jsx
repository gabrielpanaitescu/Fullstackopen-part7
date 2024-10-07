import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationProvider } from "./Contexts/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Router>
);
