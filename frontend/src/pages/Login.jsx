import {useState} from "react";
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();
   async function handleLogin() {
    console.log("button clicked");

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

    if (response.ok) {
        console.log("Login successful!");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        navigate("/");
    } else {
        alert(data.non_field_errors?.[0] || "Login failed.");
    }
}
}


export default Login;