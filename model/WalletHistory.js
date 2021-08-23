const mongoose = require("mongoose");

const Schema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isLabel:{
        type:String,
        required:["Is Label tidak boleh kosong"]
    },
    currency_code:{
        type:String,
        default:"IDR"
    },
    amount:{
        type:Number,
        required:["amount tidak boleh kosong"]
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

const WalletCollection=mongoose.model("WalletHistory",Schema);

module.exports=WalletCollection;