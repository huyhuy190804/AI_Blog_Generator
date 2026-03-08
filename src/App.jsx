import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@/pages/Home";
import Editor from "@/pages/Editor";
import History from "@/pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
