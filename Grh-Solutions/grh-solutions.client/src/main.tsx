import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalProvider } from "./contexts/globalContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { NotificationContainer } from "./components/notifications/NotificationContainer";

createRoot(document.getElementById("root")!).render(
  <NotificationProvider>
    <NotificationContainer />
    <BrowserRouter>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </BrowserRouter>
  </NotificationProvider>
);
