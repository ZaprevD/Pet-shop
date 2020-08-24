const express = require("express");
const router = express.Router();
const userRoutes = require("./users/routes");
const productRoutes = require("./products/routes");
const categoryRoutes = require("./categories/routes");

router.use(userRoutes);
router.use(productRoutes);
router.use(categoryRoutes);

module.exports = router;