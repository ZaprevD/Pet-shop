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
    };

    const newUserSubmitHandler = async data => {
        await props.newUserSubmit(data);
        setShowNewUserForm(false);
    };

    return (
        <div className="sidebar-window">
            <ul>
                <li>{props.location.pathname === "/admin/users" ? <Link className="arrow"  to="/admin"> Производи </Link> : <Link className="arrow" to="/admin/users"> Корисници </Link> }</li>
                <li><Link className="arrow"  to="/admin/categories">Категории</Link></li>
    {props.location.pathname === "/admin/users" ? <li onClick={showNewUserFormHandler}>{!showNewUserForm ? "Додади нов корисник" : "Откажи"}</li>:
                props.location.pathname === "/admin/categories" ? null : <li onClick={showNewProductFormHandler}>{!showNewProductForm ? "Додади нов производ" : "Откажи"}</li> }
                <li onClick={logOut}>Одјави се</li>
            </ul>
            {showNewProductForm ? <NewProductForm addNew={newProductSubmitHandler} /> : null}
            {showNewUserForm ? <NewUserForm newUserSubmit={newUserSubmitHandler} /> : null}
        </div>
    );
};
export default withRouter(Sidebar);