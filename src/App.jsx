// import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import PromptSection from "./components/PromptSection";

import Editor from "./components/Editor";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [message, setMessage] = useState("");
  return (
    <>
      {/* <Navbar /> */}
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route
          path='/home'
          element={<PromptSection setMessage={setMessage} />}
        />
        <Route path='/editor' element={<Editor message={message} />} />
      </Routes>
    </>
  );
}

export default App;
