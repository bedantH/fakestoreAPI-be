import React from "react";
import { Routes, Route } from "react-router-dom";
import { PLP } from "./pages/PLP";
import { PDP } from "./pages/PDP";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PLP />} />
        <Route path="/product" element={<PDP />} />
      </Routes>
    </div>
  );
}

export default App;
