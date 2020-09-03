import React, { useEffect, useState } from "react";
import Sidebar from "../../SidebarComponent/Sidebar";
import { getAllCategories, editCategory, deleteCategory, addTopCategory, logOut } from "../../adminFunctions";
import ListElement from "./ListElement";
import NewCategoryForm from "./NewCategoryForm";
import { ErrorWindow, isTokenExpired, Loader } from "../../Helper";
import "./categories.css";
const Categories = props => {

    const [categories, setCategories] = useState([]);
    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isTokenExpired()) {
            logOut();
        } else {
            fetchCategories();
        }
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        let data = await getAllCategories();
        setCategories(data.data);
        setIsLoading(false);
    }

    const hideErr = () => setError("");

    const showFormHandler = e => setShowNewCategoryForm(!showNewCategoryForm);

    const updateCategoryHandler = async (name, id) => {
        setIsLoading(true);
        let inf = await editCategory(name, id);
        switch (inf.status) {
            case "409":
                setIsLoading(false);
                setError("Category with this name alredy exists");
                break;
            case "500":
                setIsLoading(false);
                setError("Something went wrong, please try again latter");
                break;
            default:
                setIsLoading(false);
                fetchCategories();
        }
    }

    const deleteCategoryHandler = async id => {
        setIsLoading(true);
        await deleteCategory(id);
        fetchCategories();
        setIsLoading(false);
    }

    const newCategorySubmitHandler = async name => {
        setIsLoading(true);
        const inf = await addTopCategory(name);
        switch (inf.status) {
            case "409":
                setError("Category alredy exists");
                setIsLoading(false);
                break;
            case "500":
                setError("Something went wrong, please try again latter");
                setIsLoading(false);
                break;
            default:
                fetchCategories();
                setIsLoading(false);
        }
    }

    return (
        <React.Fragment>
            <Sidebar />
            <div className="categories-container">
                {isLoading ? <Loader /> : null }
                {error !== "" ? <ErrorWindow message={error} hideErrorMessage={hideErr} /> : null}
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