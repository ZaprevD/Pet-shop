const query = require("./query");
const categoryQuery = require("../categories/query");

getAllProducts = async (req, res) => {
    try {
        let data = await query.getAllProductsQuery();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    };
};

getProductsByCategory = async (req, res) => {
    try {
        let data = await query.getProductsByCategoryIdQuery(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

updateProduct = async (req, res) => {
    try {
        await query.updateProductQuery(req.body.name, req.body.desc, req.body.price, req.params.id, req.body.on_action);
        res.status(200).send("Производот е изменет!");
    } catch (error) {
        res.status(500).send(error);
    };
};

deleteProduct = async (req, res) => {
    try {
        await query.deleteProductQuery(req.params.id);
        res.status(200).send("Производот е избришан!");
    } catch (error) {
        res.status(500).send(error);
    };
};

addNewProduct = async (req, res) => {
    try {
        req.body.onAction === "true" ? req.body.onAction = true : req.body.onAction = false;
        req.body.image === "" ? req.body.image = "No_Picture.jpg" : null;
        req.body.image.includes(" ") ? req.body.image = req.body.image.replace(/\s/g, '-') : null;
        req.body.desc === "" ? req.body.desc = "Без опис" : null;
        const categoryId = await categoryQuery.getCategoryByNameQuery(req.body.categoryName);
        if (req.files !== null) {
            const file = req.files.productImage;
            file.name.includes(" ") ? file.name = file.name.replace(/\s/g, '-') : null;
            await file.mv(`pet-shop/public/products-images/${file.name}`, err => {
                if (err) {
                    res.status(500).send(err);
                };
            });
            await query.addNewProductQuery(req.body.name, req.body.desc, req.body.price, req.body.onAction, categoryId[0].Id, req.body.image);
        } else {
            await query.addNewProductQuery(req.body.name, req.body.desc, req.body.price, req.body.onAction, categoryId[0].Id, req.body.image);
            res.status(200).send("Производот е додаден");
        };
    } catch (error) {
        res.status(500).send(error);
    };
};

changeProductPicture = async (req, res) => {
    try {
        if (req.files !== null) {
            const file = req.files.productImage;
            file.name.includes(" ") ? file.name = file.name.replace(/\s/g, '-') : null;
            await file.mv(`pet-shop/public/products-images/${file.name}`, err => {
                if (err) {
                    return res.status(500).send(err);
                };
            });
            await query.changeProductPictureQuery(file.name, req.params.id)
            return res.status(200).send("Сликата е променета");
        };
        res.status(400).send("Немате внесено слика");
    } catch (error) {
        res.status(500).send(error.message);
    };
};

getProductsOnAction = async (req, res) => {
    try {
        let onActionProducts = await query.getProductsOnActionQuery();
        res.status(200).send(onActionProducts);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

module.exports = {
    getAllProducts, updateProduct, deleteProduct, addNewProduct, getProductsOnAction,
    changeProductPicture, getProductsByCategory
};