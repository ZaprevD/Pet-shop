import React, { useState } from "react";
import Actions from "./Actions";
import EditCategoryForm from "./EditCategoryForm";
const ListElement = props => {

    const [showEditForm, setShowEditForm] = useState(false);
    
    const setDefaultView = e => setShowEditForm(false);

    const showFormHandler = e => {
        setDefaultView();
        setShowEditForm(true);
    };

    return (
        !showEditForm ? <li className={props.class} > {props.category.NAME}
            <Actions delete={props.deleteCategory} id={props.category.Id} isShow={showEditForm} showForm={showFormHandler} />
        </li> : <EditCategoryForm defaultView={setDefaultView} editCategory={props.editCategory}
        id={props.category.Id} name={props.category.NAME} />
    )
}

export default ListElement;