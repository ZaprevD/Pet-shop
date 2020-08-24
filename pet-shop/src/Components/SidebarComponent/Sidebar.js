import React, { useState } from "react";
import "./sidebar.css";
import { logOut } from "../adminFunctions";
import NewProductForm from "../AdminComponent/NewProductForm";
import NewUserForm from "../AdminComponent/UsersComponent/NewUserForm";
import { Link, withRouter } from "react-router-dom";
const Sidebar = props => {

    const [showNewProductForm, setShowNewProductForm] = useState(false);
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const showNewProductFormHandler = e => setShowNewProductForm(!showNewProductForm);
    const showNewUserFormHandler = e => setShowNewUserForm(!showNewUserForm);

    const newProductSubmitHandler = async data => {
        await props.newProduct(data);
        setShowNewProductForm(false);
    }

    const newUserSubmitHandler = async data => {
        await props.newUserSubmit(data);
        setShowNewUserForm(false);
    }

    return (
        <div className="sidebar-window">
            <ul>
                <li>{props.location.pathname === "/admin/users" ? <Link to="/admin"> Products </Link> : <Link to="/admin/users"> Users </Link> }</li>
                <li><Link to="/admin/categories">Categories</Link></li>
                {props.location.pathname === "/admin/users" ? <li onClick={showNewUserFormHandler}>Add new user</li>:
                props.location.pathname === "/admin/categories" ? <li>Add new category</li> : <li onClick={showNewProductFormHandler}>Add new product</li> }
                <li onClick={logOut}>Log Out</li>
            </ul>
            {showNewProductForm ? <NewProductForm addNew={newProductSubmitHandler} /> : null}
            {showNewUserForm ? <NewUserForm newUserSubmit={newUserSubmitHandler} /> : null}
        </div>
    )

}

export default withRouter(Sidebar);