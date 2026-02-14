import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { access_token, role } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);

      navigate("/redirect");

    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-xl font-bold text-blue-700 text-center">Login</h1>

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

        <button className="w-full bg-blue-700 text-white py-2 rounded">
          Sign In
        </button>

        <p className="text-center text-sm">
          No account? <Link to="/signup" className="text-blue-700">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;