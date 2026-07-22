import { useState } from "react";

function Register() {

    // 1. State variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 2. Functions
    async function handleRegister() {
        const response = await fetch("http://localhost:8000/api/register/", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
    console.log("Registration successful:", data);
} else {
    console.log("Registration failed:", data);
}
    }

    
    return (
       <div>
            <h1>Register</h1>

            <input
                type="email"
                placeholder="Enter UNT email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default Register;