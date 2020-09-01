import React, { useState, useEffect } from "react";
import "./login.css";
import { adminLogin } from '../adminFunctions';
import { isLoggedIn, Loader } from "../Helper";
const LoginAdmin = props => {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn()) {
            window.location.href = "/admin";
        }
    })

    const onSubmitHandler = async e => {
        setIsLoading(true);
        e.preventDefault();
        const data = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        let status = await adminLogin(data);
        switch (parseInt(status)) {
            case 200:
                setIsLoading(false);
                window.location.href = "/admin";
                break;
            case 404:
                setIsLoading(false);
                setError("User not found");
                break;
            case 400:
                setIsLoading(false);
                setError("Invalid Password");
                break;
            default:
                setIsLoading(false);
                setError(`Something went wrong. Please try again latter`);
                break;
        }

    }

    return (
        <div className="container-100">
            <div className="rope"></div>
            {isLoading ? <Loader /> : null}
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
        </div>
    )

}

export default LoginAdmin;