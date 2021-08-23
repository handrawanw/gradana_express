const express=require("express");
const Router=express.Router();

const Users=require("../controller/User");

// middleware
const {validate,viewValidateError}=require("../middleware/Validate");

Router.post("/register",validate("register"),viewValidateError,Users.Register);
Router.post("/login",validate("login"),viewValidateError,Users.Login);

Router.post("/log",Users.LogTes)

module.exports=Router;
