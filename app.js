const express=require("express");
const app=express();

const CORS=require("cors");

require("dotenv").config();
require("./config/databaseServer")();
app.use(CORS());

app.use(express.json(),express.urlencoded({extended:true}));

const API=require("./router/index");
const errHandler=require("./middleware/errHandler");
app.use(
    API,
    errHandler
);

app.listen(3000,(err)=>{
    if(err) throw err;
        console.log(`Server is running`);
});
