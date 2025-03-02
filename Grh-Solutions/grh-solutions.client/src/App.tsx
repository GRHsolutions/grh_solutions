import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme/theme";
import { useParametros } from "./contexts/useParamether.provider";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import { NavBar } from "./generics/navBar/navBar";

function App() {
  const { parametros } = useParametros();
  const theme = parametros.dark;
  const routes = useRoutes(AppRoutes);

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <Suspense>
        <NavBar />
        {routes}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
