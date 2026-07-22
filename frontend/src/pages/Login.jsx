import {useState} from "react";
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();
    async function handleLogin() {
    console.log("button clicked");
    console.log("sending:", email, password);
    const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password :password,
        }),
    });

    
    const data = await response.json();

if (response.ok) {
   if (response.ok) {
    console.log("Login successful!");
    navigate("/");
}
}
}

    return (
        <div>
            <h1>Login Page</h1>
            <input type="email"
            placeholder= "Email"
            value = {email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             />
            <button onClick={handleLogin}>Login</button>
            <p>Email state: {email}</p>
            
           

        </div>
        
    )
}


export default Login;