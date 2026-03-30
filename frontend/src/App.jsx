import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import WorkerLogin from "./pages/Workerlogin.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import WorkerDashboard from "./pages/WorkerDashboard.jsx";
import Services from "./pages/Service.jsx";
import WorkersList from "./pages/WorkersList.jsx";

function App() {
  return (
    <BrowserRouter>
      <nav className="app-navbar">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/user-login" className="nav-link">
          User Login
        </NavLink>
        <NavLink to="/worker-login" className="nav-link">
          Worker Login
        </NavLink>
        <NavLink to="/services" className="nav-link">
          Services
        </NavLink>
        <NavLink to="/workers" className="nav-link">
          Workers
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/workers" element={<WorkersList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;