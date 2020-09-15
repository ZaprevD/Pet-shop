import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendResetPasswordMail } from "../adminFunctions";
import { NotificationWindow, ErrorWindow, Loader } from "../Helper";
const ForgotPassword = props => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [timer, setTimer] = useState(0);

    const onSubmitHandler = async e => {
        e.preventDefault();
        setLoading(true);
        const data = {
            username: e.target[0].value
        }
        const res = await sendResetPasswordMail(data);
        if (res.status === 200) {
            timerFunc();
            setMessage(res.data);
            setLoading(false);
        } else if (parseInt(res.status) === 404) {
            setError("Корисникот не е пронајден.");
            setLoading(false);
        } else {
            setError("Настана серверска грешка ве молам обидетесе подоцна!");
            setLoading(false);
        }
    }

    const timerFunc = () => {
        setDisableButton(true)
        let i = 50;
        const time = setInterval(() => {
            i--
            setTimer(i);
            if (i === 0) {
                setTimer(0);
                clearInterval(time)
                setDisableButton(false)
            };
        }, 1000);
    }

    const hideErr = () => setError("");

    return (
        <div className="container-100">
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErr} /> : null}
            {loading ? <Loader /> : null}
            <div className="rope"></div>
            <div className="login-box">
                <div className="info-window">
                    <h3>Forgot your password?</h3>
                </div>
                {message !== "" ? <NotificationWindow message={message} timer={timer} /> : null}
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="forgot-password">Please insert your username</label>
                    <input id="forgot-password" type="text" placeholder="Username" />
                    <button className={disableButton ? "disabled-btn" : null} type="submit" disabled={disableButton}>Send Email</button>
                    <Link className="back-btn" to="/loginadmin">Back</Link>
                </form>
            </div>
        </div>
    )
}
export default ForgotPassword;