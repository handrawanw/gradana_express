const express=require("express");
const Router=express.Router();

const Wallet=require("../controller/Wallet");
const Auth=require("../middleware/Auth");

// middleware
const {validate,viewValidateError}=require("../middleware/Validate");

Router.get("/me",Auth.AuthJWT,Wallet.WalletFindOne);
Router.get("/history",Auth.AuthJWT,Wallet.WalletHistoryAll);

Router.patch("/topup",Auth.AuthJWT,validate("topup"),viewValidateError,Wallet.TopupSaldo);

module.exports=Router;