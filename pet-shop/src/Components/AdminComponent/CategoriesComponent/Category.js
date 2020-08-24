import React from "react";
import ListElement from "./ListElement";
const Category = props => {

    return (
        <React.Fragment>
            <ul>
                {props.category.children.length < 1 ? <ListElement name={props.name} class='red' deleteHandler={props.deleteHandler} category={props.category} /> :
                    <ListElement class='arrow' name={props.name} deleteHandler={props.deleteHandler} category={props.category} />
                }
            </ul>
        </React.Fragment>
    )
}

export default Category;