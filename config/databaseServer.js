const mongoose=require("mongoose");

const Databases=()=>{
    let URL=process.env.MONGO;
    // let URL="mongodb://localhost:27017/gradana";
    let connection=mongoose.connection;
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    });
    connection.on("error",console.error.bind(console,"connection error : "));
    connection.once("open",()=>{
        console.log("Terhubung ke database");
    });
};

module.exports=Databases;