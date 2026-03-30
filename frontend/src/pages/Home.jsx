import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h1>Smart Home Services</h1>

      <button onClick={() => navigate("/user-login")}>User Login</button>
      <button onClick={() => navigate("/worker-login")}>Worker Login</button>
    </div>
  );
}

export default Home;