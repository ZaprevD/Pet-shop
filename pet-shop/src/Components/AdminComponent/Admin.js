import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getAllProducts, updateProduct, deleteProduct, addNewProduct } from "../adminFunctions";
import ProductCart from "./ProductCart";
import Sidebar from "../SidebarComponent/Sidebar";
import { Loader, isLoggedIn } from "../Helper";
import "./admin.css";
const Admin = props => {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    const fetchData = async () => {
        let data = await getAllProducts();
        switch (parseInt(data.status)) {
            case 401:
                setMessage("Unauthorized");
                break;
            case 200:
                setMessage("");
                setProducts(data.data);
                break;
            default:
                setMessage("Something went wrong please try again latter");
                break;
        }
    }

    useEffect(() => {
        if (!localStorage.authToken) {
            props.history.push("/");
        } else {
            fetchData();
        }
    }, []);

    const updateProductHandler = async (name, desc, price, id, actionProduct) => {
        await updateProduct(name, desc, price, id, actionProduct);
        fetchData();
    }
    const deleteProductHandler = async id => {
        await deleteProduct(id);
        fetchData();
    }

    const addProductHandler = async data => {
        await addNewProduct(data);
        fetchData();
    }

    return (
        <React.Fragment>
            <Sidebar newProduct={addProductHandler} />
            <div className="products-box">
                {message === "" ? products.map(el => <ProductCart key={el.Id} id={el.Id} delete={deleteProductHandler}
                  imgPath={el.Image_path}  name={el.Name} update={updateProductHandler} onAction={el.On_Action} desc={el.Description} price={el.Price} />) : <h3>{message}</h3>
                }
            </div>
        </React.Fragment>
    )

}

export default withRouter(Admin);