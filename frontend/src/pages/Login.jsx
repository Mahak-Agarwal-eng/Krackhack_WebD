// 
import API from "../../services/api";

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
  }
};