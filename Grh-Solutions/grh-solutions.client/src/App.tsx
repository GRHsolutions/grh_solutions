import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { NavBar } from "./generics/navBar/navBar";
import { AppRoutes } from "./routes/routes";
import { useAuth } from "./hooks/auth";
import React from "react";
import { http } from "./infrastructure/axios/axios";

function App() {
  const unt = AppRoutes();
  const routes = useRoutes(unt);
  const { logout } = useAuth();

  // Pasa logout a donde lo necesites
  React.useEffect(() => {
    http.setLogout(logout); // Configurar el logout globalmente si quieres
  }, []);

  return (
    <Suspense>
      <NavBar />
      {routes}
    </Suspense>
  );

  // return (
  //   <SnackbarProvider maxSnack={3} autoHideDuration={4000}> // eso pa que wey 
  //     <Suspense>
  //       <NavBar />
  //       {routes}
  //     </Suspense>
  //   </SnackbarProvider>
  // );
}

export default App;
