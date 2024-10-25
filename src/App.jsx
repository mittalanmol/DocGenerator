import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import PromptSection from "./components/PromptSection";

import Editor from "./components/Editor";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<PromptSection setMessage={setMessage} />} />
        <Route path='/editor' element={<Editor message={message} />} />
      </Routes>
    </>
  );
}

export default App;
