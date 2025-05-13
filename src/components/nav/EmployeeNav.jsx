import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const EmployeeNav = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/trucks">Trucks</Link>
      </li>
      <li className="navbar-item">
        <Link to="/loads">Loads</Link>
      </li>
      <li className="navbar-item">
        <Link to="/dispatchers">Dispatchers</Link>
      </li>
      {localStorage.getItem("dispatcher_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("dispatcher_user");
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
