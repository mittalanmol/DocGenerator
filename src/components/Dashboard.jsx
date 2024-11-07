import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-sm text-center"
          style={{ minHeight: "250px", width: "270px", borderRadius: "12px" }}
        >
          <div className="card-header  text-dark fs-4 fw-bold">SOW</div>
          <div className="card-body d-flex flex-column">
            <span className="mt-3 mb-5">
              Generate the desired text within seconds
            </span>
            <Link to="/home" className="mt-auto">
              <button className="btn btn-outline-primary w-100  ">
                GENERATE NOW
              </button>
            </Link>
          </div>
        </div>
        {/* <div
          className="card shadow-sm text-center"
          style={{ minHeight: "250px", width: "270px", borderRadius: "12px" }}
        >
          <div className="card-header  text-dark fs-4 fw-bold">SOW</div>
          <div className="card-body d-flex flex-column">
            <span className="mt-3 mb-5">See the suggested Prompts</span>
            <Link to="/prompts" className="mt-auto">
              <button className="btn btn-outline-primary w-100 ">
                Click Here to See
              </button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
