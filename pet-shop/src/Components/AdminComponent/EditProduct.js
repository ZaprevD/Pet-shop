import React, { useState } from "react";
import { uploadFile } from "../adminFunctions";
import { productNameValidation, ErrorWindow, productPriceValidation } from "../Helper";
const EditProduct = props => {

    const [name, setName] = useState(props.name);
    const [desc, setDesc] = useState(props.desc);
    const [price, setPrice] = useState(props.price);
    const [onAction, setOnAction] = useState(props.onAction);
    const [newImage, setNewImage] = useState("");
    const [error, setError] = useState("");

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
        if(res !== 200) {
            setError("Something went wrong, please try again latter."); 
        }
    }

    const hideErrorMsg = () => setError("");

    const updateProductSubmit = async () => {
        if (!productNameValidation(name).isOk) {
            setError(productNameValidation(name).msg);
        } else if (!productPriceValidation(price).isOk) {
            setError(productPriceValidation(price).msg)
        } else {
            await props.update(name, desc, price, props.id, onAction);
        }
    }

    return (
        <React.Fragment>
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErrorMsg} /> : null}
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
                    {newImage !== "" ? <div onClick={changeImageSubmit} className="set-image-btn">Постави</div> : null}
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
                    <button onClick={updateProductSubmit} className="save-btn">Save</button>
                    <button onClick={props.onCancel} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditProduct;