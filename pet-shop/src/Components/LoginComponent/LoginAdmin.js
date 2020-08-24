import React, { useState, useEffect } from "react";
import "./login.css";
import { adminLogin } from '../adminFunctions';
import { isLoggedIn } from "../Helper";
const LoginAdmin = props => {

    const [error, setError] = useState("");

    useEffect(() => {
        if(isLoggedIn()){
            window.location.href = "/admin";
        }
    })

    const onSubmitHandler = async e => {
        e.preventDefault();
        const data = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        let status = await adminLogin(data);
        switch (parseInt(status)) {
            case 200: window.location.href = "/admin";
                break;
            case 404: setError("User not found");
                break;
            case 400: setError("Invalid Password");
                break;
            default: setError(`Something went wrong. Please try again latter`);
            break;
        }

    }

    return (
        <div className="login-box">
            <div className="info-window">
                {error !== "" ? <div className="error-holder"><h3>{error}</h3></div> : <h3>Admin Login</h3>}
            </div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )

}

export default LoginAdmin;