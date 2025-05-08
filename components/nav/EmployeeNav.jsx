import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const EmployeeNav = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/trucks">Tickets</Link>
      </li>
      <li className="navbar-item">
        <Link to="/loads">Employees</Link>
      </li>
      <li className="navbar-item">
        <Link to="/customers">Customers</Link>
      </li>
      <li className="navbar-item">
        <Link to="/profile">Profile</Link>
      </li>
      {localStorage.getItem("honey_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("honey_user"); // change this
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
