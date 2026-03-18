import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const data = await registerUser(form);
        alert(data.message)
        navigate("/login");
    } catch (err) {
        console.error(err)
        setError(err.message);
    }
};

    return (
        <>
    <div className="container-session">
      <h2>Register with [ACME_APP]</h2>
        <form onSubmit={handleSubmit}>
            <p className="field-title">Username</p>
            <input placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value})}
            />
            <p className="field-title">Email address</p>
            <input placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value})}
            />
            <p className="field-title">Password</p>
            <input type="password"
            placeholder="password"
            onChange={(e) => setForm({ ...form, password: e.target.value})}
            />
            <button type="submit">Register</button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
        <p className="text-center">Already have an account? <Link to="/login" className="btn-secondary">Sign in</Link></p>
        </div>
        </>
    );
}