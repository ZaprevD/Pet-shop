import React, { useState, useEffect } from "react";
import "./login.css";
import { adminLogin } from '../adminFunctions';
import { Link } from "react-router-dom";
import { isLoggedIn, Loader, ErrorWindow } from "../Helper";
const LoginAdmin = props => {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn()) {
            window.location.href = "/admin";
        };
    });

    const hideError = () => setError("");

    const onSubmitHandler = async e => {
        setIsLoading(true);
        e.preventDefault();
        const data = {
            username: e.target[0].value,
            password: e.target[1].value
        };
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
        };
    };

    return (
        <div className="container-100">
            <div className="rope"></div>
            {isLoading ? <Loader /> : null}
            <div className="login-box">
                <div className="info-window">
                    <h3>Admin Login</h3>
                    {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideError} /> : null}
                </div>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                    <div className="forgot-paths">
                    <div>
                        <Link to="loginadmin/forgot/username">Forgot Username?</Link>
                    </div>
                    <div>
                        <Link to="loginadmin/forgot/password">Forgot Password?</Link>
                    </div>
                </div>
                </form>
             
            </div>
        </div>
    );
};

export default LoginAdmin;