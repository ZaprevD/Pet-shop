import React, { useState, useEffect } from "react";
import { getAllCategories } from "../adminFunctions";
import { productNameValidation, ErrorWindow, productPriceValidation } from "../Helper";
const NewProductForm = props => {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [onAction, setOnAction] = useState(false);
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const data = await getAllCategories();
        if (data !== undefined) {
            if (data.data[0] !== undefined) {
                setSelectedCategory(data.data[0].NAME);
            }
        }
        setCategories(data.data);
    }

    const onNameChange = e => setName(e.target.value);
    const onDescChange = e => setDesc(e.target.value);
    const onPriceChange = e => setPrice(e.target.value);
    const onActionChange = e => setOnAction(e.target.checked);
    const onCategoryChange = e => {
        setSelectedCategory(e.target.value);
    }
    const onImageChange = e => {
        setImage(e.target.files[0]);
        setImageName(e.target.value.substring(e.target.value.lastIndexOf("\\") + 1))
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        if (!productNameValidation(name).isOk) {
            setError(productNameValidation(name).msg);
        } else if (!productPriceValidation(price).isOk) {
            setError(productPriceValidation(price).msg);
        } else {
            setError("");
            const fd = new FormData();
            fd.append("name", name);
            fd.append("desc", desc);
            fd.append("price", price);
            fd.append("onAction", onAction);
            fd.append("image", imageName);
            fd.append("categoryName", selectedCategory);
            fd.append("productImage", image);
            await props.addNew(fd);
        }
    }

    return (
        <div className="new-product-form">
            {error !== "" ? <ErrorWindow message={error} hideErrorMessage={() => setError("")} /> : null}
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
                <div className="input-holder-flex" >
                    <p>Категорија</p>
                    <select onChange={onCategoryChange} value={selectedCategory} >
                        {categories.map(el => <option key={el.Id} id={el.Id} >{el.NAME}</option>)}
                    </select>
                </div>
                <div className="input-holder">
                    <button onClick={onSubmitHandler}>Додади Производ</button>
                </div>
            </form>
        </div>
    )
}
export default NewProductForm;