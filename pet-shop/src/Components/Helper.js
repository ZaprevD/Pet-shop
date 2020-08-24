import React from "react";
import jwt_decode from "jwt-decode";

export const Loader = props => {
    return (
        <div id="loader"></div>
    )
}

export const isLoggedIn = () => {
    if (localStorage.authToken) return true;
    return false;
}

export const getCurrentUser = () => {
    let token = localStorage.authToken;
    let decoded = jwt_decode(token);
    return decoded.user;
}

