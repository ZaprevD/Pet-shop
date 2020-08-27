import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
const CategoryElement = props => {

    const setProductsToShow = e => {
        e.stopPropagation();
        props.callBack(e.target.id)
    }

    return (
        <li>
            <NavLink id={props.category.Id} onClick={setProductsToShow} to={"/products/" + props.category.NAME}> {props.category.NAME}

            </NavLink>
        </li>
    )
}

export default withRouter(CategoryElement);