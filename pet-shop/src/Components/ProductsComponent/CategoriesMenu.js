import React, { useState, useEffect } from "react";
import CategoryElement from "./CategoryElement";
import { getAllCategories, getProductsByCategoryId, getAllProducts } from "../adminFunctions";
import { withRouter, NavLink } from "react-router-dom";
import Product from "./Product";
const CategoriesMenu = props => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchCategories();
        setFirstView();
    }, []);
    const fetchCategories = async () => {
        let data = await getAllCategories();
        setCategories(data);
    }

    const setFirstView = async () => {
        const allProducts = await getAllProducts();
        switch (allProducts.status) {
            case 200: setProducts(allProducts.data)
                break;
            case 500: setErrorMsg("Something went wrong, Please try again latter");
                break;
            default: setProducts(allProducts.data);
        }
        if (allProducts.data.length === 0) setErrorMsg("No products found!");
    }

    const callBack = async id => {
        if (id !== null) {
            const products = await getProductsByCategoryId(id);
            setProducts(products);
        } else {
            setFirstView();
        }
    }

    return (
        <div className="products-view">
            <div className="menu-window">
                <ul className="client-categories-menu">
                    <li>
                        <NavLink onClick={() => callBack(null)} to="/products/all"> Site
                        </NavLink>
                    </li>
                    {categories.map(el => <CategoryElement callBack={callBack} key={el.Id} category={el} />)}
                </ul>
            </div>
            <div className="products-window-holder">
                {errorMsg === "" ? products.map(el => <Product key={el.Id} desc={el.Description}
                    price={el.Price} />) : errorMsg}
            </div>
        </div>

    )

}

export default withRouter(CategoriesMenu);