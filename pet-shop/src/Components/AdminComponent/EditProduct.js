import React, { useState } from "react";
import { uploadFile } from "../adminFunctions";
const EditProduct = props => {

    const [name, setName] = useState(props.name);
    const [desc, setDesc] = useState(props.desc);
    const [price, setPrice] = useState(props.price);
    const [onAction, setOnAction] = useState(props.onAction);
    const [newImage, setNewImage] = useState("");

    const onNameChangeHandler = e => setName(e.target.value);
    const onDescChangeHandler = e => setDesc(e.target.value)
    const onPriceChangeHandler = e => setPrice(e.target.value);
    const onActionChangeHandler = e => setOnAction(e.target.checked);
    const onNewImageChangeHandler = e => setNewImage(e.target.files[0]);

    const style = {
        backgroundImage: `url(${require(`../../../public/products-images/` + props.imgPath)})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    const changeImageSubmit = async () => {
        const fd = new FormData();
        fd.append("productImage", newImage)
        let res = await uploadFile(props.id, fd);
        console.log(res);
    }

    return (
        <div className="product-cart">
            <div className="box-50">
                <div style={style} className="image-box">
                    <div className="edit-image-holder">
                        <div className="change-pic-btn">
                            <p>Смени Слика</p>
                        </div>
                        <input onChange={onNewImageChangeHandler} type="file" name="productImage" id="slika" accept="image/*" placeholder="Image" />
                    </div>
                </div>
                {newImage !== "" ? <button onClick={changeImageSubmit} className="set-image-btn">Set</button> : null}
            </div>
            <div className="box-50">
                <div className="cart-header">
                    <input type="text" onChange={onNameChangeHandler} value={name} />
                </div>
                <div className="cart-body">
                    <textarea onChange={onDescChangeHandler} defaultValue={desc}></textarea>
                </div>
                <div className="footer">
                    <input type="text" onChange={onPriceChangeHandler} value={price} />
                </div>
                <div className="action-product">
                    <label htmlFor="action">На акција</label>
                    <input onChange={onActionChangeHandler} id="action" type="checkbox" name="onAction" defaultChecked={onAction} />
                </div>
                <button onClick={() => props.update(name, desc, price, props.id, onAction)} className="save-btn">Save</button>
                <button onClick={props.onCancel} className="cancel-btn">Cancel</button>
            </div>
        </div>
    )
}

export default EditProduct;