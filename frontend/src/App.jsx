import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Home/Home";
import AboutUs from "./components/Home/AboutUs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;