import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PromptSection.css";
import "./Loader.css";

// eslint-disable-next-line react/prop-types
const PromptSection = ({ setMessage }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const sendingData = async () => {
    setLoading(true); // Start loading
    try {
      // Clean up the extra escape slashes for newline characters
      const cleanedPrompt = inputText.replace(/\\n/g, "\n");
      const response = await axios.post(
        "http://192.168.10.53:8000/api/v1/generateSowMd",
        {
          prompt: cleanedPrompt,
        }
      );

      console.log("Response:", response.data.response.message);
      setMessage(response.data.response.message);
      setLoading(false); // Stop loading
      navigate("/editor");
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false); // Stop loading on error
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputText) {
      return;
    }
    sendingData();
  };

  return (
    <div className='d-flex justify-content-center align-items-center flex-column content'>
      {loading ? (
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <textarea
            className='prompt'
            placeholder='Enter the instructions...'
            onChange={handleChange}
          />
          <button className='generate-btn mt-4' onClick={handleSubmit}>
            Generate
          </button>
        </>
      )}
    </div>
  );
};

export default PromptSection;
