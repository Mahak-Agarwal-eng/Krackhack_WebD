import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", {
        email,
        password,
        role,
      });

      const { access_token, role: userRole } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("role", userRole);

      navigate("/redirect");

    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-xl font-bold text-blue-700 text-center">Signup</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="authority">Authority</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-blue-700 text-white py-2 rounded">
          Create Account
        </button>

        <p className="text-center text-sm">
          Already have account? <Link to="/" className="text-blue-700">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;