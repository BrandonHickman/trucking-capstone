import { useEffect, useState } from "react";
import "./Loads.css";
import { useNavigate } from "react-router-dom";
import {
  claimLoad,
  deleteLoadById,
  getAllLoadsWithDispatchers,
  markLoadAsComplete,
} from "../../services/loadService.jsx";
import { getAllStatuses } from "../../services/statusServices.jsx";
import { getAllTrucks } from "../../services/truckService.jsx";
import { LoadFilterBar } from "./LoadFilterBar.jsx";

export const Load = ({ currentUser }) => {
  const [allLoads, setAllLoads] = useState([]);
  const [filter, setFilter] = useState("all");

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
        console.error("Failed to delete load:", error);
      });
  };

  const filteredLoads = allLoads.filter((load) => {
    if (filter === "available") return load.statusId === 1;
    if (filter === "inTransit") return load.statusId === 2;
    if (filter === "completed") return load.statusId === 3;
    return true;
  });

  const handleClaimLoad = (loadId) => {
    claimLoad(loadId, currentUser.id)
      .then(() =>
        Promise.all([
          getAllStatuses(),
          getAllLoadsWithDispatchers(),
          getAllTrucks(),
        ])
      )
      .then(([statuses, loads, trucks]) => {
        const loadsWithStatus = loads.map((load) => {
          const status = statuses.find((s) => s.id === load.statusId);
          const truck = trucks.find((t) => t.id === load.truckId);
          return { ...load, status, truck };
        });

        setAllLoads(loadsWithStatus);
      })
      .catch((error) => {
        console.error("Failed to claim load:", error);
      });
  };

  const handleMarkComplete = (e, loadId) => {
    e.stopPropagation();

    markLoadAsComplete(loadId)
      .then(() =>
        Promise.all([
          getAllStatuses(),
          getAllLoadsWithDispatchers(),
          getAllTrucks(),
        ])
      )
      .then(([statuses, loads, trucks]) => {
        const loadsWithStatus = loads.map((load) => {
          const status = statuses.find((s) => s.id === load.statusId);
          const truck = trucks.find((t) => t.id === load.truckId);
          return { ...load, status, truck };
        });

        setAllLoads(loadsWithStatus);
      })
      .catch((error) => {
        console.error("Failed to mark load as complete:", error);
      });
  };

  useEffect(() => {
    Promise.all([
      getAllLoadsWithDispatchers(),
      getAllStatuses(),
      getAllTrucks(),
    ])
      .then(([loads, statuses, trucks]) => {
        const loadStatus = loads.map((load) => {
          const status = statuses.find((s) => s.id === load.statusId);
          const truck = trucks.find((t) => t.id === load.truckId);
          return { ...load, status, truck };
        });
        setAllLoads(loadStatus);
      })
      .catch((error) => console.error("Error fetching loads or status", error));
  }, []);

  return (
  <div className="loads-container">
    <div className="loads-header">
      <h2>All Loads</h2>
    </div>

    <div className="create-load-container">
      <button
        className="create-load-btn"
        onClick={() => navigate("/loads/form")}
      >
        Create New Load
      </button>
    </div>

      <LoadFilterBar onFilterChange={setFilter} currentFilter={filter} />

      <div className="loads">
        {filteredLoads.map((load) => (
          <div
            key={load.id}
            className="load-card"
            onClick={() => navigate(`/loads/${load.id}`)}
          >
            <h3>
              {load.pickup} to {load.dropoff}
            </h3>
            <p>Assigned Dispatcher: {load.user?.name || "Unassigned"}</p>
            <p>Status: {load.status?.name || "Unknown"}</p>
            <p>
              Assigned Truck:{" "}
              {load.truck
                ? `${load.truck.make} (${load.truck.plate})`
                : "No truck assigned"}
            </p>

            {currentUser?.id === load.userId && load.statusId !== 3 && (
              <div
                className="button-group"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => handleEdit(load.id)}>Edit</button>
                <button onClick={() => handleDelete(load.id)}>Delete</button>
                <button onClick={(e) => handleMarkComplete(e, load.id)}>
                  Mark as Complete
                </button>
              </div>
            )}

            {!load.user && (
              <button
                className="claim-load-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClaimLoad(load.id);
                }}
              >
                Claim Load
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
