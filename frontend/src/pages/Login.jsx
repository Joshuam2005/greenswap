import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {
        console.log("Login button clicked");

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            console.log("Login response:", data);

            if (response.ok) {
                console.log("Login successful!");

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userEmail", email);
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                navigate("/marketplace");

                // Save JWT tokens if your backend returns them
                if (data.access) {
                    localStorage.setItem("accessToken", data.access);
                }

                if (data.refresh) {
                    localStorage.setItem("refreshToken", data.refresh);
                }

                navigate("/marketplace");
            } else {
                alert(
                    data.non_field_errors?.[0] ||
                    data.detail ||
                    data.error ||
                    data.email?.[0] ||
                    data.password?.[0] ||
                    "Login failed."
                );

                console.log("Login failed:", data);
            }
        } catch (error) {
            console.error("Login request failed:", error);
            alert("Could not connect to the backend.");
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;