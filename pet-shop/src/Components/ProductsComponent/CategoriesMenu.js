import React, { useState, useEffect } from "react";
import CategoryElement from "./CategoryElement";
import { getAllCategories, getProductsByCategoryId, getAllProducts } from "../adminFunctions";
import { InfoWindow, Loader } from "../Helper";
import { withRouter, NavLink, Link } from "react-router-dom";
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
        switch (parseInt(data.status)) {
            case 200:
                setCategories(data.data);
                setIsLoading(false);
                break;
            case 500:
                setErrorMsg("Настана серверска грешка ве молам обидетесе подоцна!");
                setIsLoading(false);
                break;
            default:
                setErrorMsg("");
                setCategories(data.data);
                setIsLoading(false);
        }

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
                setErrorMsg("Настана серверска грешка ве молам обидетесе подоцна!");
                setIsLoading(false);
                break;
            default:
                setErrorMsg("");
                setIsLoading(false);
                setProducts(allProducts.data);
        }
        if (allProducts.data.length === 0) setErrorMsg("Моментално не се пронајдени производи.");
    }

    const callBack = async id => {
        setIsLoading(true);
        if (id !== null) {
            const products = await getProductsByCategoryId(id);
            if (products.data.length === 0) {
                setErrorMsg("Не се пронајдени производи во оваа категорија.");
                setIsLoading(false);
            } else {
                if (products.status === 200) {
                    setErrorMsg("");
                    setProducts(products.data);
                    setIsLoading(false);
                } else {
                    setErrorMsg("Настана серверска грешка ве молам обидетесе подоцна!");
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
                {errorMsg === "" ? products.map(el => <Link className="product-link" key={el.Id} to={{
                    pathname: `${el.Id}`,
                    state: el
                }}> <Product desc={el.Description}
                    name={el.Name} picture={el.Image_path} price={el.Price} /> </Link>) : <InfoWindow message={errorMsg} />}
            </div>
        </div>
    );
};
export default withRouter(CategoriesMenu);