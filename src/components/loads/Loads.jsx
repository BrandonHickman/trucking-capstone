import { useEffect, useState } from "react";
import "./Loads.css";
import { useNavigate } from "react-router-dom";
import {
  deleteLoadById,
  getAllLoadsWithDispatchers,
} from "../../services/loadService.jsx";

export const Load = ({ currentUser }) => {
  const [allLoads, setAllLoads] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (loadId) => {
    navigate(`/loads/form/${loadId}`);
  };

  const handleDelete = (loadId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (!confirmDelete) return;

    deleteLoadById(loadId)
      .then(() => {
        setAllLoads((prevLoads) =>
          prevLoads.filter((load) => load.id !== loadId)
        );
      })
      .catch((error) => {
        console.error("Failed to delete load.", error);
      });
  };

  useEffect(() => {
    getAllLoadsWithDispatchers()
      .then((loads) => {
        setAllLoads(loads);
      })
      .catch((error) => {
        console.error("Error fetching loads:", error);
      });
  }, []);

  return (
    <div className="loads-container">
        <div className="loads-header">
            <h2>All Loads</h2>
            <button className="create-load-btn" onClick={() => navigate("/loads/form")}>
             Create New Load
            </button>
        </div>
    <div className="loads">
      {allLoads.map((load) => (
        <div
          key={load.id}
          className="load-card"
          onClick={() => navigate(`/loads/${load.id}`)}
        >
          <h3>
            {load.pickup} to {load.dropoff}
          </h3>
          <p>Assigned Dispatcher: {load.user?.name || "Unassigned"}</p>

          {/* Only show buttons if user owns this load */}
          {currentUser?.id === load.user?.id && (
            <div className="button-group" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => handleEdit(load.id)}>Edit</button>
              <button onClick={() => handleDelete(load.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};
