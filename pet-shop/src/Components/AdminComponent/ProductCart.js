import React, { useState } from "react";
import EditProduct from "./EditProduct";
import { FaTrashAlt } from "react-icons/fa";

const ProductCart = props => {
    const [showEditForm, setShowEditForm] = useState(false);
    const showEditHandler = () => setShowEditForm(!showEditForm);

    const updateHandler = async (name, desc, price, id, action) => {
        await props.update(name, desc, price, id, action);
        setShowEditForm(false)
    }
    const deleteHandler = async () => {
        let deleteItem = window.confirm("Дали сте сигурен дека сакате да го избришете овој производ?");
        if (deleteItem) {
            await props.delete(props.id);
        }
    }
    const style = {
        backgroundImage: `url(${require(`../../../public/products-images/` + props.imgPath)})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    return (
        !showEditForm ? <div className="product-cart">
            <div className="box-50">
                <div style={style} className="image-box"></div>
            </div>
            <div className="delete-product" onClick={deleteHandler}>
                <FaTrashAlt className="delete-icon" />
            </div>
            <div className="box-50">
                <div className="cart-header">
                    <h3>{props.name}</h3>
                </div>
                <div className="cart-body">
                    <p>{props.desc}</p>
                </div>
                <div className="cart-footer">
                    <h3>{props.price} Ден</h3>
                </div>
            </div>
            <button onClick={showEditHandler} className="edit-btn">Edit</button>
        </div> : <EditProduct imgPath={props.imgPath} onCancel={showEditHandler} id={props.id} name={props.name}
            update={updateHandler} onAction={props.onAction} price={props.price} desc={props.desc} />
    )
}
export default ProductCart;