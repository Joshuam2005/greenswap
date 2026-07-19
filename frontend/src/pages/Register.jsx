import {useState} from "react";

function Register()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(){
        console.log("Username: ", username);
        console.log("Password: ", password);

    }

    return(

        <div>
            <h1>Register</h1>

            <input>
            type= "text"
            placeholder= "Enter username"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
            </input>
        </div>
    )
}