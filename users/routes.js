const express = require("express");
const router = express.Router();
const action = require("./action");
const validation = require("../middlewares/validations");
router.get(`/api/users`, action.getAllUsers);
router.post(`/api/login`, action.logginUser);
router.put("/api/user/:id", validation.passwordValidationForExistingUser, action.editUser);
router.post("/api/register", validation.emailValidation, validation.usernameValidation,
validation.passwordValidation, action.registerUser);
router.delete(`/api/user/:id`, action.deleteUser);
router.put(`/api/resetpassword`, action.sendResetPasswordEmail);
router.put("/api/forgot/username", action.sendResetUsernameEmail);
module.exports = router;