import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import WorkerLogin from "./pages/Workerlogin.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import WorkerDashboard from "./pages/WorkerDashboard.jsx";
import Services from "./pages/Service.jsx";
import WorkersList from "./pages/WorkersList.jsx";
import Orders from "./pages/Orders.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";


function App() {
  const userToken = localStorage.getItem("userToken");
  const workerToken = localStorage.getItem("workerToken");
  return (
    <BrowserRouter>
      <nav className="app-navbar">
        <NavLink to="/" className="nav-link">Home</NavLink>

        {! (userToken || workerToken) && (
          <>
            <NavLink to="/user-login" className="nav-link">User Login</NavLink>
            <NavLink to="/worker-login" className="nav-link">Worker Login</NavLink>
          </>
        )}

        {(userToken || workerToken) && (
          <>
            <NavLink to="/services" className="nav-link">Services</NavLink>
            <NavLink to="/workers" className="nav-link">Workers</NavLink>
            {workerToken && (
              <NavLink to="/orders" className="nav-link">Orders</NavLink>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("userToken");
                localStorage.removeItem("workerToken");
                localStorage.removeItem("workerId");
                window.location.href = "/";
              }}
              className="nav-link"
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/worker-login" element={<WorkerLogin />} />

        {/* 🔒 Protected */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workers"
          element={
            <ProtectedRoute>
              <WorkersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;