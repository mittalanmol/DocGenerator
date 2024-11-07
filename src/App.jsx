// import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import PromptSection from "./components/PromptSection";

import Editor from "./components/Editor";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import SamplePrompts from "./components/SamplePrompts";

function App() {
  const [message, setMessage] = useState("");
  return (
    <>
      {/* <Navbar /> */}
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route
          path='/proposalmaker'
          element={<PromptSection setMessage={setMessage} />}
        />
        <Route path='/editor' element={<Editor message={message} />} />
        <Route path='/prompts' element={<SamplePrompts />} />
      </Routes>
    </>
  );
}

export default App;
