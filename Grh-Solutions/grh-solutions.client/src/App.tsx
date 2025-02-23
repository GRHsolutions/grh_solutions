import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import { NavBar } from "./generics/navBar/navBar";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme/theme";
import { useParametros } from "./contexts/useParamether.provider";

function App() {
  const { parametros } = useParametros();
  const theme = parametros.dark;
  
  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <Router>
        <Routes>        
          <Route path="/" element={<><NavBar/><Main name=""/></> }/>
        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;
