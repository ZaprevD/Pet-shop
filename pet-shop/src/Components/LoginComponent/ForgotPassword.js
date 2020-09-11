import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendResetPasswordMail } from "../adminFunctions";
import { AlertWindow, ErrorWindow, Loader } from "../Helper";
const ForgotPassword = props => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const onSubmitHandler = async e => {
        e.preventDefault();
        setLoading(true);
        const data = {
            username: e.target[0].value
        }
        const res = await sendResetPasswordMail(data);
        if (res.status === 200) {
            setDisabledBtn();
            setMessage(res.data);
            setLoading(false);
        } else if (parseInt(res.status) === 404) {
            setError("User not found");
            setLoading(false);
        } else {
            setError("Something went wrong, please try again latter.");
            setLoading(false);
        }
    }

    const setDisabledBtn = () => {
        setDisableButton(true);
        setTimeout(() => {setDisableButton(false)},60000)
    }

    const hideErr = () => setError("");
    const okClickHandler = () => props.history.push("/loginadmin");

    return (
        <div className="container-100">
            {message !== "" ? <AlertWindow message={message} action={okClickHandler} /> : null}
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErr} /> : null}
            {loading ? <Loader /> : null}
            <div className="rope"></div>
            <div className="login-box">
                <div className="info-window">
                    <h3>Forgot your password?</h3>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="forgot-password">Please insert your username</label>
                    <input id="forgot-password" type="text" placeholder="Username" />
                    <button className={disableButton? "disabled-btn" : null} type="submit" disabled={disableButton}>Send Email</button>
                    <Link className="back-btn" to="/loginadmin">Back</Link>
                </form>
            </div>
        </div>
    )

}

export default ForgotPassword;