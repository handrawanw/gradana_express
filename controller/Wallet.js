const mongoose=require("mongoose");
const WalletModel=require("../model/Wallet");
const WalletHistory=require("../model/WalletHistory");

class Wallet {

    static WalletFindOne(req,res,next){
        const {id}=req.decoded;
        WalletModel.findOne({user:id}).then((Data)=>{
            res.status(200).json({
                message:"Successfull",
                Data
            });
        }).catch(next);
    }

    static WalletHistoryAll(req,res,next){
        const {id}=req.decoded;
        WalletHistory.aggregate([{
            $match:{
                user:mongoose.Types.ObjectId(id)
            }
        },{
            $group:{
                _id:null,
                history:{
                    $push:"$$ROOT"
                }
            }
        },{
            $project:{
                _id:0,
                history:{
                    $slice:["$history",100]
                },
            }
        }]).then((Data)=>{
            res.status(200).json({
                message:"Successfull",
                Data:Data.length>0?Data[0].history:[]
            });
        }).catch(next);
    }

    static async TopupSaldo(req,res,next){
        let session=await mongoose.startSession();
        try {
            const {id}=req.decoded;
            const {amount,email}=req.body;
            await session.withTransaction(async()=>{
                let AccountWallet=await WalletModel.findOne({
                    user:id,
                }).populate({
                    path:"user",
                    select:["email"]
                }).session(session);
                if(AccountWallet){
                    if(AccountWallet.user&&AccountWallet.user.email===email){
                        AccountWallet.balance+=Number(amount);
                        await AccountWallet.save({session});
                        await WalletHistory.create([{
                            user: AccountWallet.user._id,
                            isLabel: "Topup Wallet",
                            amount: Number(amount)
                        }],{session});
                    }else{
                        throw new Error("Email dan token tidak cocok");
                    }
                }else{
                    throw new Error(`Wallet tidak ditemukan`);
                }
                res.status(200).json({
                    message:"Successfull Topup",
                    AccountWallet
                });
            });
        }catch(err){
            next(err);
        }finally{
            session.endSession();
        }
    }

}

module.exports=Wallet;