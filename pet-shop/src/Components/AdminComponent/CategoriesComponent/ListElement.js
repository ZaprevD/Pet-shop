import React, { useState } from "react";
import Category from "./Category";
const ListElement = props => {

    const [showChildrenElements, setShowChildrenElements] = useState(false);
    const [sub, setSub] = useState([]);

    const showChildrenHandler = async e => {
        e.stopPropagation();
        if (e.target.classList.contains('arrow')) {
            e.target.classList.toggle('arrow-down');
            await setSub(props.category.children); 
            setShowChildrenElements(!showChildrenElements);
        }
    };

    return (
        <li className={props.class} onClick={showChildrenHandler}>
            {showChildrenElements ? sub.map(el => <Category key={el.id} deleteHandler={props.deleteHandler} category={el} />) : null}
        </li>
    )   
}

export default ListElement;