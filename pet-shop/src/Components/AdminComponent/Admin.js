import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getAllProducts, updateProduct, deleteProduct, addNewProduct, logOut } from "../adminFunctions";
import ProductCart from "./ProductCart";
import { isTokenExpired, Loader } from "../Helper";
import Sidebar from "../SidebarComponent/Sidebar";
import "./admin.css";
const Admin = props => {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        let data = await getAllProducts();
        switch (parseInt(data.status)) {
            case 401:
                setIsLoading(false);
                setMessage("Unauthorized");
                break;
            case 500:
                setIsLoading(false);
                setMessage("Something went wrong please try again latter");
                break;
            default:
                setIsLoading(false);
                setMessage("");
                setProducts(data.data);
        }
    }

    useEffect(() => {
        if (!localStorage.authToken) {
            props.history.push("/");
        } else {
            if (isTokenExpired()) {
                logOut();
            } else {
                fetchData();
            }
        }
    }, [props.history]);

    const updateProductHandler = async (name, desc, price, id, actionProduct) => {
        setIsLoading(true);
        await updateProduct(name, desc, price, id, actionProduct);
        fetchData();
    };

    const deleteProductHandler = async id => {
        setIsLoading(true);
        await deleteProduct(id);
        fetchData();
    };

    const addProductHandler = async data => {
        setIsLoading(true);
        await addNewProduct(data);
        fetchData();
    };

    return (
        <React.Fragment>
            <Sidebar newProduct={addProductHandler} />
            <div className="products-box">
                { isLoading ? <Loader /> : null }
                {message === "" ? products.map(el => <ProductCart key={el.Id} id={el.Id} delete={deleteProductHandler}
                    imgPath={el.Image_path} name={el.Name} update={updateProductHandler} onAction={el.On_Action} desc={el.Description} price={el.Price} />) : <h3>{message}</h3>
                }
            </div>
        </React.Fragment>
    );
};
export default withRouter(Admin);