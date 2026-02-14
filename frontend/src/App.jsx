import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import StudentDashboard from "./pages/student/StudentDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

const RoleRedirect = () => {
  const { role } = useAuth();

  if (role === "student") return <Navigate to="/student" />;
  if (role === "faculty") return <Navigate to="/faculty" />;
  if (role === "authority") return <Navigate to="/authority" />;
  if (role === "admin") return <Navigate to="/admin" />;

  return <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/redirect" element={<RoleRedirect />} />

      <Route path="/student/*" element={<StudentDashboard />} />
      <Route path="/faculty/*" element={<FacultyDashboard />} />
      <Route path="/authority/*" element={<AuthorityDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;