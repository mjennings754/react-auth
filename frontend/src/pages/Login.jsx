import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({email: "", password: ""});
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit fires")
    try {
    const data = await loginUser(form);
    console.log("Login api response:", data);

    if (data.token) {
      login(data);
      console.log("Navigating to /dashboard...")
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
      placeholder="Email"
      onChange={(e) => setForm({ ...form, email: e.target.value})}
      />
      <input 
      type="password"
      placeholder="password"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Sign in</button>
    </form>
    <p>Don't have an account? <Link to="/register">Register</Link></p>
    </>
  );
}