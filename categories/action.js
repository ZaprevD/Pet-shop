const query = require("./query");


getAllCategories = async (req, res) => {
    try {
        let data = await query.getAllCategoriesQuery();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}

updateCategory = async (req, res) => {
    try {
        await query.updateCategoryQuery(req.body.name, req.params.id);
        res.status(200).send("Category Updated");
    } catch (error) {
        console.log(error);
    }
}

deleteCategory = async (req, res) => {
    try {
        await query.deleteCategoryQuery(req.params.id);
        res.status(200).send("Category Deleted!");
    } catch (error) {
        console.log(error);
    }
}

addNewTopCategory = async (req, res) => {
    try {
        await query.addNewTopCategoryQuery(req.body.name);
        res.status(200).send(`Категоријата е додадена`);
    } catch (error) {
        console.log(error)
    }
}

addNewSubCategory = async (req, res) => {
    try {
        await query.addNewSubCategoryQuery(req.body.name, req.params.id);
        res.status(200).send(`Категоријата е додадена`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

getTopCategories = async (req, res) => {
    try {
        let topCategories = await query.getTopCategoriesQuery();
        res.status(200).send(topCategories);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = { getTopCategories, addNewSubCategory, addNewTopCategory, deleteCategory, getAllCategories,
     updateCategory }