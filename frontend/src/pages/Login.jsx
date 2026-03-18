import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api";

export default function Login() {
  const [form, setForm] = useState({email: "", password: ""});
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);

    if (data.token) {
      login(data);
    } else {
      alert("Login failed");
    }
  };

  return (
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
      <button>Sign in</button>
    </form>
  );
}