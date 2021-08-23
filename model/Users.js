const mongoose = require("mongoose");

const Schema=new mongoose.Schema({
    username:{
        type:String,
        required:["Username tidak boleh kosong",true]
    },
    email:{
        type:String,
        validate:{
            validator:(value)=>{
                let Valid=/\S+@\S+\.\S+/.test(value);
                if(!Valid){
                   throw new Error('Email tidak valid'); 
                }
            },
        }
    },
    no_hp:{
        type:String,
        required:["no_hp tidak boleh kosong",true]
    },
    password:{
        type:String,
        required:["Password tidak boleh kosong",true]
    }
},{
    timestamps:{
        createdAt:"createdAt"
    }
});

const WalletCollection=mongoose.model("User",Schema);

module.exports=WalletCollection;