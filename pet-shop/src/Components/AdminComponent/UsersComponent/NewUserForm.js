import React from "react";

const NewUserForm = props => {

    const submitHandler = async e => {
        e.preventDefault();
        const data = {
            username: e.target[0].value,
            password: e.target[1].value,
            email: e.target[2].value
        }
        await props.newUserSubmit(data);
    }

    return (
        <div className="new-product-form">
            <form onSubmit={submitHandler}>
                <div className="input-holder">
                    <input type="text" placeholder="Корисничко Име" />
                </div>
                <div className="input-holder">
                    <input type="password" placeholder="Лозинка" />
                </div>
                <div className="input-holder">
                    <input type="email" placeholder="Е-Маил" />
                </div>
                <div className="input-holder">
                    <button type="submit">Додади Нов Корисник</button>
                </div>
            </form>
        </div>
    )

}

export default NewUserForm;