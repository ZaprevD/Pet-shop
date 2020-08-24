const query = require("./query");


getAllProducts = async (req, res) => {
    try {
        let data = await query.getAllProductsQuery();
        let clear = data.reverse();
        res.status(200).send(clear);
    } catch (error) {
        console.log(error);
    }
}

updateProduct = async (req, res) => {
    try {
        await query.updateProductQuery(req.body.name, req.body.desc, req.body.price, req.params.id, req.body.on_action);
        res.status(200).send("Product Updated");
    } catch (error) {
        console.log(error);
    }
}

deleteProduct = async (req, res) => {
    try {
        await query.deleteProductQuery(req.params.id);
        res.status(200).send("Product Deleted!");
    } catch (error) {
        console.log(error);
    }
}

addNewProduct = async (req, res) => {
    try {
        req.body.onAction === "true" ? req.body.onAction = true : req.body.onAction = false;
        req.body.image === "" ? req.body.image = "No_Picture.jpg" : null;
        req.body.image.includes(" ") ? req.body.image = req.body.image.replace(/\s/g, '-') : null;
        await query.addNewProductQuery(req.body.name, req.body.desc, req.body.price, req.body.onAction, req.body.image);
        if (req.files !== null) {
            const file = req.files.productImage;
            file.name.includes(" ") ? file.name = file.name.replace(/\s/g, '-') : null;
            file.mv(`pet-shop/public/products-images/${file.name}`, err => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
            })
        }
        res.status(200).send("Производот е додаден");
    } catch (error) {
        console.log(error)
    }
}

changeProductPicture = async (req, res) => {
    try {
        console.log(req.files);
        if (req.files !== null) {
            const file = req.files.productImage;
            file.name.includes(" ") ? file.name = file.name.replace(/\s/g, '-') : null;
            file.mv(`pet-shop/public/products-images/${file.name}`, err => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
            })
            await query.changeProductPictureQuery(file.name, req.params.id)
            return res.status(200).send("Сликата е променета");
        }
        res.status(400).send("Немате внесено слика");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

getProductsOnAction = async (req, res) => {
    try {
        let onActionProducts = await query.getProductsOnActionQuery();
        res.status(200).send(onActionProducts);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = { getAllProducts, updateProduct, deleteProduct, addNewProduct, getProductsOnAction,
     changeProductPicture }