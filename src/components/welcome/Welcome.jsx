import "./Welcome.css";

export const Welcome = () => {
  return (
    <div className="welcome-background">
      <div className="welcome-content">
        <h1>
          <span>Welcome to American Transport</span>
        </h1>
        <img
          className="truck-logo"
          src="/images/truck-bg.png"
          alt="truck"
        ></img>
        <div>
          <h2>Moving America one mile at a time</h2>
        </div>
      </div>
    </div>
  );
};
