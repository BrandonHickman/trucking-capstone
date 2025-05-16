import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../../services/userService.jsx";
import { getAllLoadsWithDispatchers } from "../../services/loadService.jsx";
import "./Dispatcher.css"

export const DispatcherDetails = () => {
  const { dispatcherId } = useParams();
  const [dispatcher, setDispatcher] = useState(null);
  const [loadCount, setLoadCount] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([getAllUsers(), getAllLoadsWithDispatchers()]).then(
      ([users, loads]) => {
        const foundDispatcher = users.find(
          (user) => user.id === parseInt(dispatcherId)
        );
        const assignedLoads = loads.filter(
          (load) => load.userId === parseInt(dispatcherId)
        );

        setDispatcher(foundDispatcher);
        setLoadCount(assignedLoads.length);
      }
    );
  }, [dispatcherId]);

  if (!dispatcher) return <p>Loading...</p>

  return (
    <div className="dispatchers-container">
        <div className="dispatchers-header">
            <h2>Dispatcher Details</h2>
        </div>
    <div className="dispatcher-details-card"
    onClick={() => navigate("/dispatchers")}
    style={{ cursor: "pointer" }}
    >
        <h2>{dispatcher.name}</h2>
        <p>Email: {dispatcher.email}</p>
        <p># of Loads Managed: {loadCount}</p>
    </div>
    </div>
  )
};
