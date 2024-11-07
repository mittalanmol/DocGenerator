import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='nav-bar'>
      <Link className='logo' to='/'>
        <img
          src='Logo.png'
          className='sub-logo'
          alt='logo-img'
          style={{ height: "27px", width: "76px" }}
        />
      </Link>
      <nav>
        {/* <NavLink
          exact='true'
          activeclassname='active'
          to='/proposalmaker'
          className='nav-item'
        >
          <TiHome size={30} />
          <span>Home</span>
        </NavLink> */}
        <NavLink
          exact='true'
          activeclassname='active'
          className='nav-item'
          to='/'
        >
          <MdDashboard size={30} />
          <span>Dashboard</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
