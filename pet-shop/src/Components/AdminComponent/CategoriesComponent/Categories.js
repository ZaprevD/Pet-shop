import React, { useEffect, useState } from "react";
import Sidebar from "../../SidebarComponent/Sidebar";
import { getAllCategories, editCategory, deleteCategory, addTopCategory } from "../../adminFunctions";
import ListElement from "./ListElement";
import NewCategoryForm from "./NewCategoryForm";
import "./categories.css";
const Categories = props => {

    const [categories, setCategories] = useState([]);
    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        let data = await getAllCategories();
        setCategories(data);
    }

    const showFormHandler = e => setShowNewCategoryForm(!showNewCategoryForm);

    const updateCategoryHandler = async (name, id) => {
        await editCategory(name, id);
        fetchCategories();
    }

    const deleteCategoryHandler = async id => {
        await deleteCategory(id);
        fetchCategories();
    }

    const newCategorySubmitHandler = async name => {
        await addTopCategory(name);
        fetchCategories();
    }

    return (
        <React.Fragment>
            <Sidebar />
            <div className="categories-container">
                <div className="new-category-box">
                    <div className="button-holder">
                        <button onClick={showFormHandler}>{!showNewCategoryForm ? 'Додади нова категорија' : 'Откажи'}</button>
                    </div>
                    {showNewCategoryForm ? <NewCategoryForm setShowForm={setShowNewCategoryForm} submit={newCategorySubmitHandler} /> : null}
                </div>
                <ul className="categories-main-menu">
                    {categories.map(el => <ListElement key={el.Id} editCategory={updateCategoryHandler}
                        category={el} deleteCategory={deleteCategoryHandler} />)}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Categories;