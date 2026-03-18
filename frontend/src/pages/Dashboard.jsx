import { useEffect, useState } from "react";
import { getProtectedData } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const res = await getProtectedData(token);
            setData(res);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user?.username} </p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}