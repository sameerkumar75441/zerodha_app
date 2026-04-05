const express = require("express");
const { register, login, logout , isAuthenticated, } = require("../controller/authcontroller.js");
const {userAuth} =require("../middleware/userAuth.js")
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

authRouter.get("/is-auth",userAuth,isAuthenticated);          ////// userAuth,







module.exports = authRouter;
