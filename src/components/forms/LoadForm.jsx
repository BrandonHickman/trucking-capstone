import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../../services/userService.jsx";
import {
  createLoad,
  getLoadById,
  updateLoad
} from "../../services/loadService.jsx";
import { getAllTrucks } from "../../services/truckService.jsx";
import "./Form.css";

export const LoadForm = ({ currentUser }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUserId, setAssignedUserId] = useState("");
  const [trucks, setTrucks] = useState([]);
  const [selectedTruckId, setSelectedTruckId] = useState("");

  const { loadId } = useParams(); 
  const navigate = useNavigate();
  const isEditing = !!loadId;

  
  useEffect(() => {
    getAllUsers().then(setUsers);
    getAllTrucks().then(setTrucks);
  }, []);

  
  useEffect(() => {
    if (isEditing) {
      getLoadById(loadId).then((load) => {
        setPickup(load.pickup);
        setDropoff(load.dropoff);
        setAssignedUserId(load.userId || "");
        setSelectedTruckId(load.truckId || "");
      });
    }
  }, [loadId, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const statusId = assignedUserId ? 2 : 1;

    const loadData = {
      pickup,
      dropoff,
      userId: assignedUserId || null,
      truckId: selectedTruckId,
      statusId
    };

    const action = isEditing
      ? updateLoad(parseInt(loadId), loadData)
      : createLoad(loadData);

    action
      .then(() => navigate("/loads"))
      .catch((err) => console.error("Error saving load:", err));
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? "Edit Load" : "Create New Load"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pickup Location:
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </label>

        <label>
          Dropoff Location:
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
        </label>

        <label>
          Assign to Dispatcher:
          <select
            value={assignedUserId}
            onChange={(e) =>
              setAssignedUserId(
                e.target.value ? parseInt(e.target.value) : ""
              )
            }
          >
            <option value="">--Select a Dispatcher--</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.id === currentUser.id ? "(You)" : ""}
              </option>
            ))}
          </select>
        </label>

        <label>
          Assign Truck:
          <select
            value={selectedTruckId}
            onChange={(e) => setSelectedTruckId(parseInt(e.target.value))}
            required
          >
            <option value="">--Select a Truck--</option>
            {trucks.map((truck) => (
              <option key={truck.id} value={truck.id}>
                {truck.make} - {truck.plate}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">{isEditing ? "Update Load" : "Create Load"}</button>
        <button type="button" onClick={() => navigate("/loads")} className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  );
};
