const express = require("express");
const router = express.Router();
const action = require("./action");
const validation = require("../middlewares/validations");

router.get("/api/products", action.getAllProducts);
router.get("/api/products/on-action", action.getProductsOnAction);
router.get("/api/products/category/:id", action.getProductsByCategory)
router.put("/api/product/:id", action.updateProduct);
router.delete("/api/product/:id", action.deleteProduct);
router.post("/api/product", validation.productNameValidation,
 validation.productPriceValidation, validation.fileFormatValidation, validation.fileSizeValidation, action.addNewProduct);
router.patch(`/api/change/picture/:id`, validation.fileFormatValidation, validation.fileSizeValidation, action.changeProductPicture);

module.exports = router;
