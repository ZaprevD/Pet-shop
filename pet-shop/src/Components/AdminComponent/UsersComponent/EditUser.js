import React, { useState } from "react";
import { editUser } from "../../adminFunctions";
const EditUser = props => {

    const [email, setEmail] = useState(props.email);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState("");

    const onUsernameChangeHandler = e => setUsername(e.target.value);
    const onEmailChangeHandler = e => setEmail(e.target.value);
    const onPassChangeHandler = e => setPassword(e.target.value);

    const onSubmitHandler = async () => {
        const data = {
            username: username,
            pass: password,
            email: email
        }
        await props.editUser(data, props.id);
        props.cancel();
    }

    return (
        <React.Fragment>
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