import React, { useState, useEffect } from "react";
import CategoryElement from "./CategoryElement";
import { getAllCategories, getProductsByCategoryId, getAllProducts } from "../adminFunctions";
import { InfoWindow, Loader } from "../Helper";
import { withRouter, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Product from "./Product";
const CategoriesMenu = props => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        props.history.push("/products/all");
        fetchCategories();
        setFirstView();
    }, [props.history]);

    const fetchCategories = async () => {
        setIsLoading(true);
        let data = await getAllCategories();
        setCategories(data.data);
        setIsLoading(false);
    }

    const setFirstView = async () => {
        setIsLoading(true);
        const allProducts = await getAllProducts();
        switch (allProducts.status) {
            case 200:
                setErrorMsg("");
                setIsLoading(false);
                setProducts(allProducts.data);
                break;
            case 500:
                setErrorMsg("Something went wrong, Please try again latter");
                setIsLoading(false);
                break;
            default:
                setErrorMsg("");
                setIsLoading(false);
                setProducts(allProducts.data);
        }
        if (allProducts.data.length === 0) setErrorMsg("No products found!");
    }

    const callBack = async id => {
        setIsLoading(true);
        if (id !== null) {
            const products = await getProductsByCategoryId(id);
            if (products.data.length === 0) {
                setErrorMsg("Not products found in this category!");
                setIsLoading(false);
            } else {
                if (products.status === 200) {
                    setErrorMsg("");
                    setProducts(products.data);
                    setIsLoading(false);
                }else{
                    setErrorMsg("Something went wrong, please try again latter");
                    setIsLoading(false);
                }
            }
        } else {
            setFirstView();
        }
    }

    return (
        <div className="products-view">
            {isLoading ? <Loader /> : null}
            <div className="paths-menu">
                <FaBars className='hamburger-menu-icon' />
                <div className="menu-window">
                    <ul className="client-categories-menu">
                        <li>
                            <NavLink onClick={() => callBack(null)} to="/products/all"> Сите
                        </NavLink>
                        </li>
                        {categories.map(el => <CategoryElement callBack={callBack} key={el.Id} category={el} />)}
                    </ul>
                </div>
            </div>
            <div className="products-window-holder">
                {errorMsg === "" ? products.map(el => <Product key={el.Id} desc={el.Description}
                    name={el.Name} picture={el.Image_path} price={el.Price} />) : <InfoWindow message={errorMsg} />}
            </div>
        </div>
    )
}
export default withRouter(CategoriesMenu);