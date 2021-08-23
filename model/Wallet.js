const mongoose = require("mongoose");

const Schema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    currency_code:{
        type:String,
        default:"IDR"
    },
    balance:{
        type:Number,
        default:1e+6
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

const WalletCollection=mongoose.model("Wallet",Schema);

module.exports=WalletCollection;