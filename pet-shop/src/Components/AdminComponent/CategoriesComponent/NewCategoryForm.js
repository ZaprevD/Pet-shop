import React, { useState } from "react";
import { categoryNameValidation, ErrorWindow } from "../../Helper";
const NewCategoryForm = props => {

    const [name, setName] = useState("")
    const [error, setError] = useState("");
    const onChangeHandler = e => setName(e.target.value);

    const hideErrorMsg = () => setError("")

    const submitHandler = async e => {
        const data = { name: name }
        if (categoryNameValidation(name).isOk) {
            setError("");
            await props.submit(data);
            props.setShowForm(false);
        } else {
            setError(categoryNameValidation(name).msg)
        }
    }

    return (
        <div className="new-category-form-holder">
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErrorMsg} /> : null}
            <div className="input-holder">
                <input type="text" name="name" onChange={onChangeHandler} placeholder="Име на категорија" value={name} />
            </div>
            <div className="input-holder">
                <button onClick={submitHandler}>Зачувај</button>
            </div>
        </div>
    )
}

export default NewCategoryForm;