import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLoadsWithTrucks } from "../../services/truckService.jsx";
import "../loads/Loads.css"

export const Truck = () => {
  const [allTrucks, setAllTrucks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLoadsWithTrucks().then((data) => {
        const uniqueTruckMap = new Map()

        data.forEach((load) => {
            if (load.truck?.id) {
                uniqueTruckMap.set(load.truck.id, {
                    truck: load.truck,
                    user: load.user,
                })
            }
        })
        
        const uniqueTrucks = Array.from(uniqueTruckMap.values())
        setAllTrucks(uniqueTrucks)
    })
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
