import { useNavigate } from "react-router-dom";

function WorkerLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/worker-dashboard");
  };

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>Worker Login</h2>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default WorkerLogin;