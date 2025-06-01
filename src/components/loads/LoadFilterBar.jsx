export const LoadFilterBar = ({ onFilterChange, currentFilter }) => {
  return (
    <div className="filter-bar">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        Show All
      </button>
      <button
        className={currentFilter === "available" ? "active" : ""}
        onClick={() => onFilterChange("available")}
      >
        Available
      </button>
      <button
        className={currentFilter === "inTransit" ? "active" : ""}
        onClick={() => onFilterChange("inTransit")}
      >
        In Transit
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};
