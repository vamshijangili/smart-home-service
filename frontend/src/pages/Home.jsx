import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔥 Auto redirect if already logged in
  if (token) {
    if (role === "worker") {
      navigate("/worker-dashboard");
    } else {
      navigate("/services");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div
        style={{
          border: "2px solid #333",
          padding: "30px",
          borderRadius: "10px",
          display: "inline-block",
          background: "#f9f9f9"
        }}
      >
        <h1>Smart Home Services</h1>
        <p>Select Login Type</p>

        <button
          onClick={() => navigate("/user-login")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer"
          }}
        >
          User Login
        </button>

        <button
          onClick={() => navigate("/worker-login")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer"
          }}
        >
          Worker Login
        </button>
      </div>
    </div>
  );
}

export default Home;