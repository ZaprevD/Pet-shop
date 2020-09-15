import React, { useState } from "react";
import { passwordValidation, usernameValidation, emailValidation, ErrorWindow } from "../../Helper"
const NewUserForm = props => {

    const [error, setError] = useState("");

    const submitHandler = async e => {
        e.preventDefault();
        const data = {
            username: e.target[0].value,
            password: e.target[1].value,
            email: e.target[2].value
        }
        if (!passwordValidation(data.password).isOk) {
            setError(passwordValidation(data.password).msg);
        } else if (!usernameValidation(data.username).isOk) {
            setError(usernameValidation(data.username).msg);
        } else if (!emailValidation(data.email).isOk) {
            setError(emailValidation(data.email).msg);
        } else {
            setError("");
            await props.newUserSubmit(data);
        }
    }

    return (
        <div className="new-product-form">
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={() => setError("")} /> : null}
            <form onSubmit={submitHandler}>
                <div className="input-holder">
                    <input type="text" placeholder="Корисничко Име" />
                </div>
                <div className="input-holder">
                    <input type="password" placeholder="Лозинка" />
                </div>
                <div className="input-holder">
                    <input type="email" placeholder="Е-Маил" />
                </div>
                <div className="input-holder">
                    <button type="submit">Додади Нов Корисник</button>
                </div>
            </form>
        </div>
    )

}

export default NewUserForm;