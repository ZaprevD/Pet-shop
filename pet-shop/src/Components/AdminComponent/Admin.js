import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getAllProducts, updateProduct, deleteProduct, addNewProduct, logOut } from "../adminFunctions";
import ProductCart from "./ProductCart";
import { isTokenExpired, Loader, ErrorWindow } from "../Helper";
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
        let data = await updateProduct(name, desc, price, id, actionProduct);
        if (data.status !== 200) {
            setMessage("Something went wrong, please try again latter");
            setIsLoading(false);
        } else {
            await fetchData();
            setIsLoading(false);
        }
    };

    const deleteProductHandler = async id => {
        setIsLoading(true);
        let res = await deleteProduct(id);
        if (res.status === 200) {
            fetchData();
        } else {
            setMessage("Something went wrong please try again latter");
            setIsLoading(false);
        }
    };

    const addProductHandler = async data => {
        setIsLoading(true);
        let res = await addNewProduct(data);
        if (res.status === 200) {
            fetchData();
        } else {
            setMessage("Something went wrong please try again latter");
            setIsLoading(false);
        }
    };

    const hideErr = () => setMessage("");

    return (
        <React.Fragment>
            <Sidebar newProduct={addProductHandler} />
            <div className="products-box">
                {isLoading ? <Loader /> : null}
                {message === "" ? products.map(el => <ProductCart key={el.Id} id={el.Id} delete={deleteProductHandler}
                    imgPath={el.Image_path} name={el.Name} update={updateProductHandler} onAction={el.On_Action} desc={el.Description} price={el.Price} />)
                    : <ErrorWindow message={message} hideErrorMessage={hideErr} />
                }
            </div>
        </React.Fragment>
    );
};
export default withRouter(Admin);