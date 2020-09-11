import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { forgotUsernameMail } from "../adminFunctions";
import { Loader, AlertWindow, ErrorWindow, emailValidation } from "../Helper";
const ForgotUsername = props => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const onSubmitHandler = async e => {
        setLoading(true);
        e.preventDefault();
        let data = {
            email: e.target[0].value
        }
        if (emailValidation(data.email).isOk) {
            let res = await forgotUsernameMail(data);
            if (res.status === 200) {
                setDisabledBtn();
                setMessage(res.data);
                setLoading(false);
            } else if (parseInt(res.status) === 404) {
                setError("User not found!");
                setLoading(false);
            } else {
                setError(`Something went wrong, please try again latter`);
                setLoading(false);
            }
        } else {
            setError("Invalid email address");
            setLoading(false);
        }
    }

    const setDisabledBtn = () => {
        setDisableButton(true);
        setTimeout(() => {setDisableButton(false)},60000)
    }

    const okClickHandler = () => props.history.push("/loginadmin");
    const hideErr = () => setError("");

    return (
        <div className="container-100">
            {loading ? <Loader /> : null}
            {message !== "" ? <AlertWindow message={message} action={okClickHandler} /> : null}
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErr} /> : null}
            <div className="rope"></div>
            <div className="login-box">
                <div className="info-window">
                    <h3>Forgot your username?</h3>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="forgot-username">Please insert your email address</label>
                    <input id="forgot-username" type="text" placeholder="Email" />
                    <button className={disableButton? "disabled-btn" : null}  type="submit" disabled={disableButton} >Send Email</button>
                    <Link className="back-btn" to="/loginadmin">Back</Link>
                </form>
            </div>
        </div>
    )
}
export default withRouter(ForgotUsername);