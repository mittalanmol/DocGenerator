import { useState } from "react";
import "./SamplePrompts.css"; // Import custom CSS

const SamplePrompts = () => {
  // Sample content for each box
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

  // State to track if content has been copied
  const [copied, setCopied] = useState({});

  // Function to copy content to clipboard
  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [index]: true }));

      // Reset "Copied!" text after 2 seconds
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [index]: false }));
      }, 7000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="container  d-flex justify-content-evenly align-items-center vh-100 flex-column " style={{marginTop:"100px"}}>
      <h4 className="heading">Sample 1</h4>
      <div className="content-card">
        <div className="mb-2"><button
          onClick={() => handleCopy(content1, 1)}
          className="copy-btn"
          aria-label="Copy content 1"
        >
          {copied[1] ? "Copied!" : "Copy"}
        </button></div>
        
        <div className="content-text">{content1}</div>
      </div>
      <h4 className="heading">Sample 2</h4>
      <div className="content-card">
        <div className="mb-2"><button
          onClick={() => handleCopy(content2, 2)}
          className="copy-btn"
          aria-label="Copy content 2"
        >
          {copied[2] ? "Copied!" : "Copy"}
        </button></div>
        
        <div className="content-text">{content2}</div>
      </div>
    </div>
  );
};

export default SamplePrompts;
