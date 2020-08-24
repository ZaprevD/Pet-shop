import React, { useEffect, useState } from "react";
import Sidebar from "../../SidebarComponent/Sidebar";
import { getAllCategories } from "../../adminFunctions";
import Category from "./Category";
import ListElement from "./ListElement";
import Main from "./index";
import "./categories.css";
const Categories = props => {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        let data = await getAllCategories();
        data.forEach(element => {
            element.children = [];
            for (var i = 0; i < data.length; i++) {
                if (element.Id === data[i].ParentId) {
                    element.children.push(data[i])
                }
            }
        });
        let topCategories = data.filter(el => el.ParentId === 0);
        console.log(topCategories);
        setCategories(topCategories);
    }

    return (
        <React.Fragment>
            <Sidebar />
            <div className="categories-container">
                {categories.map(el => <Category key={el.Id} category={el} name={el.NAME} />)}
            </div>
        </React.Fragment>
    )
}

export default Categories;