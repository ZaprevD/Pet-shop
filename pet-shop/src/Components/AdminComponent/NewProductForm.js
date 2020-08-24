import React, { useState } from "react";
import { uploadFile } from "../adminFunctions";

const NewProductForm = props => {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [onAction, setOnAction] = useState(false);
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const onNameChange = e => setName(e.target.value);
    const onDescChange = e => setDesc(e.target.value);
    const onPriceChange = e => setPrice(e.target.value);
    const onActionChange = e => setOnAction(e.target.checked);
    const onImageChange = e => {
        setImage(e.target.files[0]);
        setImageName(e.target.value.substring(e.target.value.lastIndexOf("\\") + 1))
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("name", name);
        fd.append("desc", desc);
        fd.append("price", price);
        fd.append("onAction", onAction);
        fd.append("image", imageName)
        fd.append("productImage", image);
        await props.addNew(fd);
    }

    return (
        <div className="new-product-form">
            <form>
                <div className="input-holder">
                    <input onChange={onNameChange} type="text" placeholder="Име на производ" />
                </div>
                <div className="input-holder">
                    <textarea onChange={onDescChange} placeholder="Опис">

                    </textarea>
                </div>
                <div className="input-holder">
                    <input onChange={onPriceChange} type="number" placeholder="Цена" />
                </div>
                <div className="input-holder">
                    <label htmlFor="act" >На Акција</label>
                    <input onChange={onActionChange} id="act" type="checkbox" />
                </div>
                <div className="input-holder">
                    <label htmlFor="slika">Слика</label>
                    <input onChange={onImageChange} type="file" name="productImage" id="slika" accept="image/*" placeholder="Image" />
                </div>
                <div className="input-holder">
                    <button onClick={onSubmitHandler}>Додади Производ</button>
                </div>
            </form>
        </div>
    )

}

export default NewProductForm;