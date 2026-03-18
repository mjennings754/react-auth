const API_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("Register error response:", text);
        throw new Error("Email or username has already been used.");
    }
    return res.json();
};

export const loginUser = async (userData) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const getProtectedData = async (token) => {
    const res = await fetch(`${API_URL}/api/protected`, {
        headers: {Authorization: token},
    });
    return res.json();
};