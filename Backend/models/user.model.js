const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    // name:String,
    email:String,
    password:String,
    otp:Number
    // role:{type:String,enum:["admin","user"]
    // }
})


const UserModel = mongoose.model("user",userSchema)

module.exports ={
    UserModel
}