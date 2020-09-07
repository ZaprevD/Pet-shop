const express = require("express");
const router = express.Router();
const action = require("./action");
const validation = require("../middlewares/validations");

router.get("/categories", action.getAllCategories);
router.get("/top-categories", action.getTopCategories);
router.post("/top-cateogry", validation.categoryNameValidation, action.addNewTopCategory);
router.post("/sub-cateogry/:id", action.addNewSubCategory);
router.patch("/edit-category/:id", action.updateCategory);
router.delete("/delete-category/:id", action.deleteCategory);

module.exports = router;