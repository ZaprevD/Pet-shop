const express = require("express");
const router = express.Router();
const action = require("./action");
const validation = require("../middlewares/validations");

router.get("/api/categories", action.getAllCategories);
router.post("/api/top-cateogry", validation.categoryNameValidation, action.addNewTopCategory);
router.post("/api/sub-cateogry/:id", action.addNewSubCategory);
router.patch("/api/edit-category/:id", action.updateCategory);
router.delete("/api/delete-category/:id", action.deleteCategory);

module.exports = router;