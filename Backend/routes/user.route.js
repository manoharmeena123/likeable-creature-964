const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const cookieparser = require("cookie-parser");
userRouter.use(cookieparser());
const nodemailer = require("nodemailer");
const { mail } = require("./generateotpmail");
// const {client} = require("../service/redis")
const { Console } = require("console");

///redis
const redis = require("redis");
const { BookingModel } = require("../models/mybooking.model");
//===================================mybookings===============================

userRouter.post("/mybookings", async (req, res) => {
  const { startdate, starttime, endtime } = req.body;
  const booking = await BookingModel.find({ startdate });
});



//GET ALL Users================================================================>

userRouter.get("/all",async(req,res)=>{

  try{
  let data = await UserModel.find()
  res.json(data);
  }catch(err){

    res.json(err);  }
})


//DELET ALL Users================================================================>

userRouter.delete("/delete/:id",async(req,res)=>{
let id = req.params.id
  try{
  let data = await UserModel.findByIdAndDelete({_id :id})
  res.json(data);
  }catch(err){

    res.json(err);  }
})

//Register===================================================================>

userRouter.post("/otp", mail, async (req, res) => {
  //     // const {email,password} = req.body
  //     // const user = await UserModel.findOne({email})
  //     // if(user){
  //     //     res.json("Already exist,Please login")
  //     // }else{
  //     //     res.json("OTP generated !")
  //     // }
});

userRouter.post("/register", async (req, res) => {
  const { email, password, otp } = req.body;
  //    let enterotp = otp
  // let OTP = req.cookies.OTP
  // console.log(OTP)
  const user = await UserModel.findOne({ email });
  if (user) {
    res.json("Already exist,Please login");
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({ email, password: hash, otp });
        await user.save();
        res.json({ msg: "User Signup Successfully", response: "ok" });
      });
    } catch (error) {
      res.json("Error in Signup");
      console.log(error);
    }
  }
  // }
});
///////

//Login====================================================================>

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const hashed_pass = user.password;
      bcrypt.compare(password, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, "masai", {
            expiresIn: "5h",
          });
          const refreshtoken = jwt.sign({ userId: user._id }, "kasai", {
            expiresIn: "7d",
          });
          res
            .cookie("token", token, { httpOnly: true, maxAge: 1000000 })
            .cookie("refreshtoken", refreshtoken, {
              httpOnly: true,
              maxAge: 1000000,
            });
          //    redis.set("token",token)
          //  redis.set("refreshtoken",refreshtoken)
          res.json({
            msg: "Login Successfully",
            token: token,
            refreshtoken: refreshtoken,
          });
        } else {
          res.json({ msg: "Login Failed" });
        }
      });
    } else {
      res.json({ msg: "Result Not Correct" });
      // console.log(err)
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Login failed Error in try" });
  }
});

//Logout==========================================================================================>

// userRouter.get("/logout",async(req,res)=>{
//     const token = req.cookies.token
//     console.log(token)
//     // let token  = await redis.get("token")
//     // const refreshtoken = req.cookies.refreshtoken
//     try {
//         // const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
//         // blacklisteddata.push(token)
//         // fs.writeFileSync("./blacklist.json",JSON.stringify(blacklisteddata))
//         //  res.clearCookie("token").clearCookie("refreshtoken")
//         await client.LPUSH("blacktoken", token);
//         const data = await client.LRANGE("blacktoken",0,-1)

//         //  redis.lpush()

//         res.send({"msg":"Logout Successfully"})
//     } catch (error) {
//         res.json("error in logout")
//         console.log("error in logout")
//     }
// })

module.exports = {
  userRouter,
};

/////////////////////////////////////////////////////////////////////////////

//   let OTP =  req.cookies.OTP
// let OTP = await redis.get("otp")
//   console.log(OTP,otp)
// if(otp!=OTP){
//     res.json("Invalid OTP while signup !")

// }else if(otp==OTP){
