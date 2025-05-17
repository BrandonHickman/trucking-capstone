import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTruck } from "../../services/truckService";
import "./Form.css";

export const TruckForm = () => {
  const [make, setMake] = useState("");
  const [plate, setPlate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTruck = {
      make,
      plate,
    };

    createTruck(newTruck)
      .then(() => navigate("/trucks"))
      .catch((error) => console.error("Failed to create truck:", error));
  };

  return (
    <div className="form-container">
      <h2>Create New Truck</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Make:
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </label>

        <label>
          Plate Number:
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            pattern="[A-Z0-9]{3}-[A-Z0-9]{3}"
            title="Plate must be in the format XXX-XXX (letters and numbers allowed)"
            required
          />
        </label>

        <button type="submit">Create Truck</button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/trucks")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
