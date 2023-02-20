import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import { useState } from "react";

const apiBackEnd = "https://site--marvel-back-end--2zbyxgxcdybz.code.run/";

function App() {
  const [filters, setFilters] = useState({limit: 100});
  return (
    <Router>
      <Header
        apiBackEnd={apiBackEnd}
        filters={filters}
        setFilters={setFilters}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Characters apiBackEnd={apiBackEnd} filters={filters}></Characters>
          }
        />
        <Route
          path="/comics"
          element={<Comics apiBackEnd={apiBackEnd} filters={filters}></Comics>}
        />
        <Route
          path="/favoris"
          element={
            <Favorites apiBackEnd={apiBackEnd} filters={filters}></Favorites>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
