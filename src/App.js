import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Characters from "./pages/characters";
import Comics from "./pages/comics";
import Favorites from "./pages/favorites";

const apiBackEnd = "https://site--marvel-back-end--2zbyxgxcdybz.code.run/";

function App() {
  return (
    <Router>
      <Header apiBackEnd={ apiBackEnd }></Header>
      <Routes>
        <Route path="/" element={<Characters  apiBackEnd={apiBackEnd}></Characters>} />
        <Route path="/comics" element={<Comics apiBackEnd={apiBackEnd}></Comics>}/>
        <Route path="/favoris" element={<Favorites apiBackEnd={apiBackEnd}></Favorites>}/>
      </Routes>
    </Router>
  );
}

export default App;
