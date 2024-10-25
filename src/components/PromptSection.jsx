import { useState } from "react";
import "./PromptSection.css";

const PromptSection = () => {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {};
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
      <textarea
        className=' prompt'
        placeholder='Enter the instructions...'
        onChange={handleChange}
      />
      <button className='generate-btn mt-4' onSubmit={handleSubmit}>
        Generate
      </button>
    </div>
  );
};

export default PromptSection;
