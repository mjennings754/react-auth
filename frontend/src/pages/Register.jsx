import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <input placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value})}
            />
            <input placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value})}
            />
            <input type="password"
            placeholder="password"
            onChange={(e) => setForm({ ...form, password: e.target.value})}
            />
            <button type="submit">Register</button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
    );
}