import React, { useState } from "react";
import { categoryNameValidation, ErrorWindow } from "../../Helper";
const EditCategoryForm = props => {

    const [name, setName] = useState(props.name);
    const [error, setError] = useState("");
    const onChangeEventHandler = e => setName(e.target.value);
    const hideError = () => setError("");
    const updateCategorySubmitHandler = async e => {
        const data = { name: name };
        if (categoryNameValidation(data.name).isOk) {
            setError("");
            await props.editCategory(data, props.id);
            props.defaultView();
        } else {
            setError(categoryNameValidation(data.name).msg);
        }

    }

    return (
        <React.Fragment>
            {error !== "" ? <ErrorWindow hideErrorMessage={hideError} message={error}  /> : null}
            <li>
                <input onChange={onChangeEventHandler} type="text" name="category-name" value={name} />
                <div className="actions-holder">
                    <div className="action-box">
                        <button onClick={updateCategorySubmitHandler} className="save-btn">Save</button>
                    </div>
                    <div className="action-box">
                        <button onClick={props.defaultView} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            </li>
        </React.Fragment>
    )
}

export default EditCategoryForm;