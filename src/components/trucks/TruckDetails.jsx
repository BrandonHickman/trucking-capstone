import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTruckById } from "../../services/truckService.jsx";
import { getAllLoadsWithTrucks } from "../../services/loadService.jsx";
import "../loads/Loads.css"

export const TruckDetails = () => {
  const { truckId } = useParams();
  const [truck, setTruck] = useState(null);
  const [assignedLoad, setAssignedLoad] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTruckById(truckId).then(setTruck);

    getAllLoadsWithTrucks().then((loads) => {
      const match = loads.find((load) => load.truckId === parseInt(truckId));
      setAssignedLoad(match || null);
    });
  }, [truckId]);

  if (!truck) return <p>Loading truck details...</p>;

  return (
    <div className="loads-container">
      <div className="load-details-card" onClick={() => navigate("/trucks")}>
        <h2>Truck Details</h2>
        <p><strong>Make:</strong> {truck.make}</p>
        <p><strong>Plate:</strong> {truck.plate}</p>
        <p>
          <strong>Assigned Dispatcher:</strong>{" "}
          {truck.user?.name || "Unassigned"} ({truck.user?.email || "N/A"})
        </p>
        <p>
          <strong>Assigned Load:</strong>{" "}
          {assignedLoad
            ? `${assignedLoad.pickup} to ${assignedLoad.dropoff}`
            : "No load assigned"}
        </p>
      </div>
    </div>
  );
};

