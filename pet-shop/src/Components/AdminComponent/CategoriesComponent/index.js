import React, { useState } from "react";
import Category from "./Category";
const Main = props => {

    const [showChildrenElements, setShowChildrenElements] = useState(false);
    const [sub, setSub] = useState([]);

    const showChildrenHandler = async e => {
        e.stopPropagation();
        if (e.target.classList.contains('arrow')) {
            e.target.classList.toggle('arrow-down');
            await setSub(props.categories);
            setShowChildrenElements(!showChildrenElements);
        }
    };

    return (
        <ul className="categories-main-menu">
            {props.categories.map(el => el.children.length > 0 ?
                <li>{props.name} <Main key={el.Id} name={el.NAME} categories={el.children} /></li>
                : <Category name={el.NAME} key={el.Id} class='red' />
            )}
        </ul>
    )
}

export default Main;