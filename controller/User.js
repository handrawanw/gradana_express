const mongoose = require("mongoose");
const UserModel = require("../model/Users");
const Wallet = require("../model/Wallet");
const WalletHistory = require("../model/WalletHistory");

// helpers
const { hashPass, checkPass } = require("../helpers/compareHash");
const { generateToken } = require("../helpers/jwttoken");


class User {

    static LogTes(req,res,next){
        res.status(200).json({
            message:"Successfull",
            body:req.body
        })
    }

    static Register(req, res, next) {
        const { email, password, no_hp, username } = req.body;
        UserModel.findOne({ $or:[{email},{no_hp}] }).then(async (Users) => {
            if(Users){
                throw new Error("Email atau No HP telah terdaftar");
            }else{
                let Account = await UserModel.create({ email, password, no_hp, username });
                if (Account) {
                    Account.password = hashPass(Account.password);
                    let StatusSave = await Account.save();
                    await Wallet.create({
                        user: Account._id
                    });
                    await WalletHistory.create({
                        user: Account._id,
                        isLabel: "Bonus Register",
                        amount: 1e+6
                    });
                    res.status(200).json({
                        message: "Successfull Register",
                        User: StatusSave
                    });
                } else {
                    throw new Error("User gagal terdaftar");
                }
            }
        }).catch(next);
    }

    static Login(req, res, next) {
        const { email, password } = req.body;
        UserModel.findOne({ email }).then((Users) => {
            if (Users) {
                let ValidPassword = checkPass(password, Users.password);
                if (ValidPassword) {
                    let Payload = generateToken({
                        id: Users._id,
                        username: Users.name
                    });
                    res.status(200).json({
                        message: "Successfull Login",
                        Payload
                    });
                } else {
                    throw new Error("Email/Password salah");
                }
            } else {
                throw new Error("Email/Password salah");
            }
        }).catch(next);
    }

}

module.exports = User;