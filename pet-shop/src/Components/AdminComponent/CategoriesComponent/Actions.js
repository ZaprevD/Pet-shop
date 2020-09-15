import React from "react";

const Actions = props => {

    const deleteCategory = async () => {
        let sure = window.confirm("Дали сакате да ја избришете оваа категорија?");
        if (sure) {
            await props.delete(props.id)
        };
    };

    return (
        <div className="actions-holder">
            <div className="action-box">
                <button onClick={props.showForm} className="edit-category-btn" >Edit</button>
            </div>
            <div className="action-box">
                <button onClick={deleteCategory} className="delete-category-btn" >Delete</button>
            </div>
        </div>
    );
};

export default Actions;