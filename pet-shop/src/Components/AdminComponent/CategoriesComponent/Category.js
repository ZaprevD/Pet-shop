import React from "react";
import ListElement from "./ListElement";
const Category = props => {

    return (
        <ul className="categories-main-menu">
                {props.category.children.length < 1 ? <ListElement  class="red"  category={props.category} />
                : <ListElement class="arrow" category={props.category} /> }
        </ul>
    )
}

export default Category;