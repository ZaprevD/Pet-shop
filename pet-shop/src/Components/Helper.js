import React from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
export const Loader = props => {
    return (
        <div id="loader"></div>
    );
};

export const isLoggedIn = () => {
    if (localStorage.authToken) return true;
    return false;
};

export const getCurrentUser = () => {
    let token = localStorage.authToken;
    let decoded = jwt_decode(token);
    return decoded.user;
};

export const isTokenExpired = () => {
    let token = localStorage.authToken;
    let decoded = jwt_decode(token);
    if (Date.now() >= decoded.exp * 1000) {
        return true;
    };
    return false;
};

export const isResetLinkExpired = decodedToken => {
    if (Date.now() >= decodedToken.exp * 1000) {
        return true;
    };
    return false;
};

const hasNumbers = (t) => {
    return /\d/.test(t);
};

export const emailValidation = email => {
    let username = email.substr(0, email.indexOf("@"));
    var provider = email.substr(email.indexOf("@") + 1, email.lastIndexOf("."));
    var domain = email.substr(email.lastIndexOf(".") + 1);
    if (username === "" || username.length < 3) {
        return { msg: "Проверете го корисничкото име на емаилот", isOk: false }
    } else if (email.includes("@") && email.includes(".") && email !== "") {
        if (domain === undefined || domain.length < 2) return { msg: "Проверете го доменот", isOk: false };
        if (provider === undefined || provider.length < 2) return { msg: "Проверете го провајдерот", isOk: false };
        if ((hasNumbers(provider)) || hasNumbers(domain) || (domain.length > 3)) {
            return { msg: "Проверете го доменот или провајдерот", isOk: false };
        }
    } else {
        return { msg: "Погрешен Емаил", isOk: false };
    };
    return { msg: "", isOk: true };
};

export const usernameValidation = username => {
    username.trim();
    if (username.length < 3) {
        return { msg: `check your username`, isOk: false };
    } else if (username.length > 20) {
        return { msg: `check your username`, isOk: false };;
    };
    return { msg: "", isOk: true };
};

export const passwordValidation = password => {
    if (password.length < 5) {
        return { msg: `your password must be at least 5 characters`, isOk: false };
    } else if (password.length > 20) {
        return { msg: `your password cannot be longer than 20 characters`, isOk: false };
    };
    return { msg: "", isOk: true };
};

export const passwordValidationForExistingUser = password => {
    if (password === "") return { msg: "", isOk: true };
    if (password.length < 5) {
        return { msg: `your password must be at least 5 characters`, isOk: false };
    } else if (password.length > 20) {
        return { msg: `your password cannot be longer than 20 characters`, isOk: false };
    };
    return { msg: "", isOk: true };
};

export const productNameValidation = name => {
    if (name !== "") {
        if (name.length < 2) {
            return { msg: `Name of the product is not valid`, isOk: false };
        }
        return { msg: ``, isOk: true };
    } else {
        return { msg: `Please enter a name for this product`, isOk: false };
    };
};

export const categoryNameValidation = name => {
    if (name !== "") {
        if (name.length < 2) {
            return { msg: `Name of the category is not valid`, isOk: false };
        }
        return { msg: ``, isOk: true };
    } else {
        return { msg: `Please enter a name for this category`, isOk: false };
    };
};

export const productPriceValidation = price => {
    price = parseInt(price);
    if (isNaN(price)) {
        return { msg: `Please set price for this product`, isOk: false };
    };
    return { msg: ``, isOk: true };
};

export const ErrorWindow = props => {
    return (
        <div className="error-window">
            <p>{props.message}</p>
            <button className="error-btn" onClick={props.hideErrorMessage}>OK</button>
        </div>
    );
};

export const InfoWindow = props => {
    return (
        <div className="info-window-alert">
            <p>{props.message}</p>
        </div>
    );
};

export const AlertWindow = props => {
    return (
        <div className="alert-window">
            <p>{props.message}</p>
            <button onClick={props.action}>OK</button>
        </div>
    );
};

export const NotificationWindow = props => {
    return (
        <div className="notification-window">
            <p>{props.message}</p>
            <p>Not received email? Resend in {props.timer}s or
            <Link style={{ color: "purple" }} to="/loginadmin" > Login now</Link>
            </p>
        </div>
    );
};