import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalProvider } from "./contexts/globalContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { NotificationContainer } from "./components/notifications/NotificationContainer";
import { disableConsoleLogs } from "./utils/disableConsole";

// Bloquea los console.logs si está en producción
const validateConsole = false; // se debe validar con un archivo .env, por el momento asi 
disableConsoleLogs(validateConsole);

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
