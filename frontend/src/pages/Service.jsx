import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>Select Service</h2>

      <button onClick={() => navigate("/workers?type=electrician")}>
        Electrician
      </button>

      <br /><br />

      <button onClick={() => navigate("/workers?type=plumber")}>
        Plumber
      </button>

      <br /><br />

      <button onClick={() => navigate("/workers?type=construction")}>
        Construction
      </button>
    </div>
  );
}

export default Services;