const authRoute = require("express").Router();
const { userRegister, userLogin } = require("../controller/auth.controller");

authRoute.post("/user/register", userRegister);
authRoute.post("/user/login", userLogin);

module.exports = { authRoute }