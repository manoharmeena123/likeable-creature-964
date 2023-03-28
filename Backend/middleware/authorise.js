const jwt = require("jsonwebtoken")
const cookieParser =  require("cookie-parser")
const authorise =(roleuser)=>{
    return(req,res,next)=>{
        const user = req.headers.userrole
        // console.log(user)
        if(roleuser.includes(user)){
            next()
        }else{
            res.json("Not Authorised")
        }
    }
}  


module.exports ={
    authorise
}