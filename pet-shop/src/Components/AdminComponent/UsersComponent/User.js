import React, { useState } from "react";
import EditUser from "./EditUser";
import { getCurrentUser } from "../../Helper";

const User = props => {

    const [showEditForm, setShowEditForm] = useState(false);
    const showEditHandler = () => setShowEditForm(!showEditForm);
    const setDefaultView = () => setShowEditForm(false);

    const deleteUserSubmit = async () => {
        let isSure = window.confirm("Дали сте сигурни дека сакате да го избришете овој корисник?")
        if (isSure) {
            await props.deleteUser(props.id);
        }
    }

    const style = {
        backgroundColor: "silver",
        color: "black"
    }

    return (
        <React.Fragment>
            <div className="user-info-holder">
                {!showEditForm ? <React.Fragment>
                    <div className="box-30">
                        <h4>{props.email}</h4>
                    </div>
                    <div className="box-30">
                        <h4>{props.username}</h4>
                    </div>
                    <div className="box-30">
                        <h4>*********</h4>
                    </div>
                    <div className="box-10-flex">
                        <div className="box-40">
                            <button onClick={showEditHandler} className="edit-b">Edit</button>
                        </div>
                        <div className="box-60">
                            <button onClick={deleteUserSubmit} disabled={props.id === getCurrentUser().id}
                                style={props.id === getCurrentUser().id ? style : null}
                                className="delete-b">Delete</button>
                        </div>
                    </div> </React.Fragment>
                    : <EditUser editUser={props.editUser}
                        cancel={setDefaultView} id={props.id} username={props.username} email={props.email} />}
            </div>
        </React.Fragment>
    )
}
export default User;