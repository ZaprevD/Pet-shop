import React from "react";

const ListElement = props => {



    return (
        <li className={props.class} > {props.category.NAME}

        </li>
    )   
}

export default ListElement;