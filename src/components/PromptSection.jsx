import "./PromptSection.css";

const PromptSection = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <textarea className=" prompt" placeholder="Enter the instructions..." />
      <button className="generate-btn mt-4">Generate</button>
    </div>
  );
};

export default PromptSection;
