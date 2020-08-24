const express = require("express");
const router = express.Router();
const action = require("./action");

router.get("/api/products", action.getAllProducts);
router.get("/api/products/on-action", action.getProductsOnAction);
router.put("/api/product/:id", action.updateProduct);
router.delete("/api/product/:id", action.deleteProduct);
router.post("/api/product", action.addNewProduct);
router.patch(`/api/change/picture/:id`, action.changeProductPicture);

module.exports = router;
