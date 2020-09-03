import React, { useState } from "react";
import { passwordValidationForExistingUser, usernameValidation, emailValidation, ErrorWindow } from "../../Helper";
const EditUser = props => {

    const [email, setEmail] = useState(props.email);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onUsernameChangeHandler = e => setUsername(e.target.value);
    const onEmailChangeHandler = e => setEmail(e.target.value);
    const onPassChangeHandler = e => setPassword(e.target.value);
    const hideErrorMessage = e => setError("");

    const onSubmitHandler = async () => {
        const data = {
            username: username,
            pass: password,
            email: email
        }
        if (!passwordValidationForExistingUser(data.pass).isOk) {
            setError(passwordValidationForExistingUser(data.pass).msg);
        } else if (!usernameValidation(data.username).isOk) {
            setError(usernameValidation(data.username).msg);
        } else if (!emailValidation(data.email).isOk) {
            setError(emailValidation(data.email).msg);
        } else {
            setError("");
            await props.editUser(data, props.id);
            props.cancel();
        }
    }

    return (
        <React.Fragment>
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErrorMessage} /> : null }
            <div className="box-30">
                <input onChange={onEmailChangeHandler} type="text" name="email" value={email} />
            </div>
            <div className="box-30">
                <input onChange={onUsernameChangeHandler} type="text" name="username" value={username} />
            </div>
            <div className="box-30">
                <input onChange={onPassChangeHandler} type="password" name="password" placeholder="*********" value={password} />
            </div>
            <div className="box-10-flex">
                <div className="box-40">
                    <button onClick={onSubmitHandler} className="edit-b">Save</button>
                </div>
                <div className="box-60">
                    <button onClick={props.cancel} className="delete-b">Cancel</button>
                </div>
            </div>
        </React.Fragment>
    )

}

export default EditUser;