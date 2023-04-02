const mongoose=require("mongoose");

const addDataSchema=mongoose.Schema({

name:String,
email:String,
location:String,
image:String,
date:String,
time:String,
services:["string"]
})

const AddDataModel=mongoose.model("localData",addDataSchema);

module.exports={AddDataModel}