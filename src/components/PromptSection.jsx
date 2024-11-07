import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PromptSection.css";
import "./Loader.css";
import Accordion from "react-bootstrap/Accordion";
import { FaArrowCircleUp } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const PromptSection = ({ setMessage }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [iconColor, setIconColor] = useState("black"); // State for icon color
  const navigate = useNavigate(); // Initialize useNavigate

  const content1 = `Basic Exchange Features:
User registration, deposits/withdrawals, trading pairs, and order management.
Add-on Features:
Crypto-to-crypto swapping, Automated Market Making (AMM), crypto loans, IEO launchpad, P2P trading, airdrop tools, and more.
Multi-Role Admin Access:
Robust access control for administrators and sub-admins, ensuring multi-tiered management functionality.
Dex launchpad:
Project launch, investors' investment in projects, project token to work on bonded curve`;

  const content2 = `
Basic Exchange Features: User registration, deposits/withdrawals, trading pairs, and order management.
Add-on Features: Crypto-to-crypto swapping, Automated Market Making (AMM), crypto loans, IEO launchpad, P2P trading, airdrop tools, and more.`;

  const handleOnClick = (data) => {
     // Toggle the inputText: if it's already set to `data`, clear it; otherwise, set it
     if (inputText === data) {
      setInputText("");
      setIconColor("black"); // Reset icon color to black if cleared
    } else {
      setInputText(data);
      setIconColor("#3099d2"); // Set icon color to blue if data is displayed
    }
  };
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
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column content"
        style={{ marginTop: "100px" }}
      >
        {loading ? (
          <div className="lds-roller">
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
              className="prompt"
              placeholder="Enter the instructions..."
              onChange={handleChange}
              value={inputText}
            />
            <button className="generate-btn mt-4" onClick={handleSubmit}>
              Generate
            </button>
            <div className="sample-prompts w-50">
              <Accordion defaultActiveKey={null}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Sample Exchange Prompt</Accordion.Header>
                  <Accordion.Body>
                    <div className="iconsss">
                      <div
                        className="upward-icon"
                        onClick={() => handleOnClick(content1)}
                        style={{ color: iconColor }}
                      >
                        <FaArrowCircleUp size={25} />
                      </div>
                      <div className="content-1">{content1}</div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Sample NFT Prompt</Accordion.Header>
                  <Accordion.Body>
                    <div className="iconsss">
                      <div
                        className="upward-icon"
                        onClick={() => handleOnClick(content2)}
                      >
                         <FaArrowCircleUp size={25} 
                          style={{ color: iconColor }}/>
                      </div>
                      <div className="conetent-1">{content2}</div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PromptSection;
