import React, { useState, useEffect } from "react";
import Sidebar from "../../SidebarComponent/Sidebar";
import { getAllUsers, registerUser, deleteUser } from "../../adminFunctions";
import User from "./User";
import { editUser, logOut } from "../../adminFunctions";
import { ErrorWindow, isTokenExpired, Loader } from "../../Helper";
const Users = props => {

    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isTokenExpired()) {
            logOut();
        } else {
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        const data = await getAllUsers();
        switch (parseInt(data.status)) {
            case 401:
                setMessage("Unauthorized");
                setIsLoading(false);
                break;
            case 500:
                setMessage("Настана серверска грешка ве молам обидетесе подоцна!");
                setIsLoading(false);
                break;
            default:
                setUsers(data.data);
                setIsLoading(false);
        };
    };

    const editUserHandler = async (data, id) => {
        setIsLoading(true);
        let inf = await editUser(data, id);
        switch (inf.status) {
            case '409':
                setMessage("Корисничкото име или емаил адресата веќе постои!");
                setIsLoading(false);
                break;
            case '500':
                setMessage("Настана серверска грешка ве молам обидетесе подоцна!");
                setIsLoading(false);
                break;
            default:
                alert(inf.data);
                fetchUsers();
        };
    };

    const addNewUserHandler = async data => {
        let inf = await registerUser(data);
        switch (inf.status) {
            case "409":
                setMessage("Корисничкото име или емаил адресата веќе постои!");
                break;
            case "500":
                setMessage("Настана серверска грешка ве молам обидетесе подоцна!");
                break;
            default:
                alert(inf.data);
                fetchUsers();
        };
    };

    const deleteUserHandler = async (id) => {
        setIsLoading(true);
      let res =  await deleteUser(id);
      if(res.status === 200) {
          alert(res.data);
          fetchUsers();
      }else {
          setMessage(`Настана серверска грешка ве молам обидетесе подоцна!`);
          setIsLoading(false);
      };
    };

    const hideError = () => setMessage("");

    return (
        <React.Fragment>
            <Sidebar newUserSubmit={addNewUserHandler} />
            <div className="users-box">
                <h1>USERS</h1>
                {isLoading ? <Loader /> : null}
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
                    editUser={editUserHandler} username={el.username} email={el.email} />)
                    : <ErrorWindow message={message} hideErrorMessage={hideError} />}
            </div>
        </React.Fragment>
    );
};
export default Users;