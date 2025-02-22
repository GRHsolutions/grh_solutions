import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import { NavBar } from "./generics/navBar/navBar";

function App() {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<><NavBar/><Main name=""/></> }/>
      </Routes>
    </Router>
  );
}

export default App;
