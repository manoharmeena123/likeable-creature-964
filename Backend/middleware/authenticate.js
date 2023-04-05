const jwt = require("jsonwebtoken");
const fs = require("fs")
const express = require("express");
const exp = require("constants");
const app = express()

//redis===========>
const {client} = require("../service/redis")


const authenticate = async(req, res, next) => {
  // const token = req.cookies.token
  const token = req.headers.authorization
  //const black_token = await client.LRANGE("blacktoken",0,-1)

  if (token) {
    jwt.verify(token, "masai", function(err, decode){
      if (decode) {
        const userId = decode.userId
        req.body.userId = userId
        next();
      } else {
          res.send("Please Login First");
      }
    })
  } else {
    console.log(err);
    res.send("Please Login");
  }

  // if(black_token.includes(token)){
  //   res.send("Login again")
  // }else{
    
  // }
}


module.exports = {
  authenticate
};
