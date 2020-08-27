import React, { useEffect, useState } from "react";
import Sidebar from "../../SidebarComponent/Sidebar";
import { getAllCategories } from "../../adminFunctions";
import ListElement from "./ListElement";
import "./categories.css";
const Categories = props => {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        let data = await getAllCategories();
        setCategories(data);
    }

    return (
        <React.Fragment>
            <Sidebar />
            <div className="categories-container">
                <ul className="categories-main-menu">
                    {categories.map(el => <ListElement key={el.Id} category={el} />)}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Categories;