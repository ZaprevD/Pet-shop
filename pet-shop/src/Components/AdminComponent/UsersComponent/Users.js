import React, { useState, useEffect } from "react";
import Sidebar from "../../SidebarComponent/Sidebar";
import { getAllUsers, registerUser, deleteUser } from "../../adminFunctions";
import User from "./User";
import { editUser } from "../../adminFunctions";
const Users = props => {

    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getAllUsers();
        switch (parseInt(data.status)) {
            case 401:
                setMessage("Unauthorized");
                break;
            case 200:
                setMessage("");
                setUsers(data.data);
                break;
            default:
                setMessage("Something went wrong please try again latter");
                break;
        }
    }

    const editUserHandler = async (data, id) => {
        await editUser(data, id);
        fetchUsers();
    }

    const addNewUserHandler = async data => {
        let inf = await registerUser(data);
        console.log(inf)
        fetchUsers();
    }

    const deleteUserHandler = async (id) => {
        let inf = await deleteUser(id);
        console.log(inf);
        fetchUsers();
    }

    return (
        <React.Fragment>
            <Sidebar newUserSubmit={addNewUserHandler} />
            <div className="users-box">
                <h1>USERS</h1>
                <div className="info-type">
                    <div className="box-30">
                        <h2>Email</h2>
                    </div>
                    <div className="box-30">
                        <h2>Username</h2>
                    </div>
                    <div className="box-30">
                        <h2>Password</h2>
                    </div>
                    <div className="box-10">
                        <h2>Actions</h2>
                    </div>
                </div>
                {message === "" ? users.map(el => <User key={el.id} id={el.id} deleteUser={deleteUserHandler}
                    editUser={editUserHandler} username={el.username} email={el.email} />) : <p>{message}</p>}
            </div>
        </React.Fragment>
    )
}
export default Users;