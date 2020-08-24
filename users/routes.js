const express = require("express");
const router = express.Router();
const action = require("./action");
router.get(`/api/users`, action.getAllUsers);
router.post(`/api/login`, action.logginUser);
router.put("/api/user/:id", action.editUser);
router.post("/api/register", action.registerUser);
router.delete(`/api/user/:id`, action.deleteUser);
module.exports = router;