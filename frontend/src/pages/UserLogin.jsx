import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // later API call
    navigate("/services");
  };

  return (
    <div className="page-card" style={{ textAlign: "center" }}>
      <h2>User Login</h2>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default UserLogin;