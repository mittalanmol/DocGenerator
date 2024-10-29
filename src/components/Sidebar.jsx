import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img src="doc.png" className="sub-logo" alt="logo-img" />
      </Link>
      <nav>
        <NavLink exact="true" activeclassname="active" to="/home" className="nav-item">
          <TiHome size={30} />
          <span>Home</span>
        </NavLink>
        <NavLink exact="true" activeclassname="active" className="nav-item" to="/">
          <MdDashboard size={30} />
          <span>Dashboard</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
