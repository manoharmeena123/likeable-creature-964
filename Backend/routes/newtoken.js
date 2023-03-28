const express = require("express")
const jwt = require("jsonwebtoken")
const newtokenRouter = express.Router()
const {redis} = require("../service/redis")


 //NEWToken =====================================================================================>

newtokenRouter.post("/newtoken",async(req,res)=>{
    const refreshtoken = req.cookies.refreshtoken
    // const refreshtoken = await redis.get("refreshtoken")
    // const black_token = await redis.lrange("blacklist_refreshtoken")
  console.log(refreshtoken)

    
    if(refreshtoken){

        const decode = jwt.verify(refreshtoken,'kasai')
    const token = jwt.sign({"userID":decode.userID,role:decode.role},'kasai',{expiresIn:"1h"})
    res.cookie("token",token,{httpOnly:true,maxAge:1000000}).cookie("refreshtoken",refreshtoken,{httpOnly:true,maxAge:1000000})
    //  redis.set("token",token)
    res.json({"msg":"New Token Generated","token":token})
    // console.log(token)
    }else{
        res.json({"msg":"Invalid refresh Token "})
    }
    })
    
   module.exports ={
    newtokenRouter
   } 
