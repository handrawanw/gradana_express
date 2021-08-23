const express=require("express");
const Router=express.Router();

const UsersRouter=require("./Users");
const WalletRouter=require("./Wallet");

Router.use("/users",UsersRouter);
Router.use("/wallet",WalletRouter);

module.exports=Router;