import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Home/Home";
import AboutUs from "./components/Home/AboutUs";
import Founder from "./components/Home/Founder";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/founder" element={<Founder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;