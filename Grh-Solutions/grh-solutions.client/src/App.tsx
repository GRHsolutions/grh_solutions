import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { NavBar } from "./generics/navBar/navBar";
import { AppRoutes } from "./routes/routes";

function App() {
  const unt = AppRoutes();
  const routes = useRoutes(unt);

  return (
      <Suspense>
        <NavBar />
        {routes}
      </Suspense>
  );
}

export default App;
