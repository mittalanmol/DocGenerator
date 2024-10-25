import { useState } from "react";
import axios from "axios";

import "./PromptSection.css";

const PromptSection = () => {
  const [inputText, setInputText] = useState("");


  // const gettingData = async () => {
  //   try {
  //     const response = await axios.get("http://192.168.10.53:8000/api/v1/healthCheck");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const sendingData = async () => {
    try {
      const response = await axios.post("http://192.168.10.53:8000/api/v1/generateSowMd", {
        prompt: inputText, 
      });
      console.log("Response:", response.data.response.message);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

 

  const handleChange = (e) => {
    setInputText(e.target.value);
  };


  const handleSubmit = () => {
    console.log("hello");
  // gettingData();
  sendingData();

  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <textarea
        className=" prompt"
        placeholder="Enter the instructions..."
        onChange={handleChange}
      />
      <button className="generate-btn mt-4" onClick={handleSubmit}>
        Generate
      </button>
    </div>
  );
};

export default PromptSection;
