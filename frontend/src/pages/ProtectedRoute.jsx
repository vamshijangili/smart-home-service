import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userToken = localStorage.getItem("userToken");
  const workerToken = localStorage.getItem("workerToken");

  if (!userToken && !workerToken) {
    return <Navigate to="/user-login" />;
  }

  return children;
}

export default ProtectedRoute;  