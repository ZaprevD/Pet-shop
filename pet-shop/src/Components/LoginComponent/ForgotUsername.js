import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { forgotUsernameMail } from "../adminFunctions";
import { Loader, ErrorWindow, emailValidation, NotificationWindow } from "../Helper";
const ForgotUsername = props => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [timer, setTimer] = useState(0);

    const onSubmitHandler = async e => {
        setLoading(true);
        e.preventDefault();
        let data = {
            email: e.target[0].value
        }
        if (emailValidation(data.email).isOk) {
            let res = await forgotUsernameMail(data);
            if (res.status === 200) {
                timerFunc();
                setMessage(res.data);
                setLoading(false);
            } else if (parseInt(res.status) === 404) {
                setError("User not found!");
                setLoading(false);
            } else {
                setError(`Настана серверска грешка ве молам обидетесе подоцна!`);
                setLoading(false);
            }
        } else {
            setError("Внесовте погрешна емаил адреса, обидете се повторно");
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
            {loading ? <Loader /> : null}
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErr} /> : null}
            <div className="rope"></div>
            <div className="login-box">
                <div className="info-window">
                    <h3>Forgot your username?</h3>
                </div>
                {message !== "" ? <NotificationWindow timer={timer} message={message} /> : null}
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="forgot-username">Please insert your email address</label>
                    <input id="forgot-username" type="text" placeholder="Email" />
                    <button className={disableButton ? "disabled-btn" : null} type="submit" disabled={disableButton} >Send Email</button>
                    <Link className="back-btn" to="/loginadmin">Back</Link>
                </form>
            </div>
        </div>
    )
}
export default withRouter(ForgotUsername);