import { Route, Routes } from "react-router-dom";
import { Home } from "./route/Home";
import React from "react";
import Setup from "./route/Setup";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/setup' element={<Setup />} />
      <Route path='*' element={<div>404</div>} />
    </Routes>
  );
}
export default App;
