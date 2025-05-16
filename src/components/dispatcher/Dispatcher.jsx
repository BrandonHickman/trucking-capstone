import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/userService.jsx";
import "./Dispatcher.css"; 

export const DispatcherList = () => {
  const [dispatchers, setDispatchers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then(setDispatchers);
  }, []);

  return (
    <div className="dispatchers-container">
      <h2>Dispatchers</h2>
      <div className="dispatchers">
        {dispatchers.map((dispatcher) => (
          <div
            key={dispatcher.id}
            className="dispatcher-card"
            onClick={() => navigate(`/dispatchers/${dispatcher.id}`)}
          >
            <h3>{dispatcher.name}</h3>
            <p>{dispatcher.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
