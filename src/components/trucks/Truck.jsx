import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLoadsWithTrucksAndUsers } from "../../services/truckService.jsx";
import "../loads/Loads.css"

export const Truck = () => {
  const [allTrucks, setAllTrucks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  getAllLoadsWithTrucksAndUsers()
    .then(({ loads, users, trucks }) => {
      const userMap = new Map(users.map((u) => [u.id, u]));
      const truckMap = new Map(trucks.map((t) => [t.id, t]));

      const enrichedLoads = loads.map((load) => ({
        truck: truckMap.get(load.truckId) || null,
        user: userMap.get(load.userId) || null,
      }));

      const uniqueTruckMap = new Map();
      enrichedLoads.forEach(({ truck, user }) => {
        if (truck?.id) {
          uniqueTruckMap.set(truck.id, { truck, user });
        }
      });

      setAllTrucks(Array.from(uniqueTruckMap.values()));
    })
    .catch((error) => {
      console.error("Error loading trucks:", error);
    });
}, []);

  return (
    <div className="loads-container">
      <div className="loads-header">
        <h2>All Trucks</h2>
        <button
          className="create-load-btn"
          onClick={() => navigate("/trucks/form")}
        >
          Create New Truck
        </button>
      </div>
      <div className="loads">
        {allTrucks.map(({ truck, user }) => (
  <div
    key={truck.id}
    className="load-card"
    onClick={() => navigate(`/trucks/${truck.id}`)}
  >
    <h3>{truck.make}</h3>
    <p>Plate: {truck.plate}</p>
    <p>Assigned Dispatcher: {user?.name || "Unassigned"}</p>
  </div>
))}
      </div>
    </div>
  );
};
