const expres=require("express");
const addRouter=expres.Router();
const {AddDataModel}=require("../models/addDataToBackend.model")

addRouter.get("/getdata/:email",async(req,res)=>{
    let par = req.params.email
    console.log(par);
    let data=await AddDataModel.find({email: par});
    res.send(data);
    console.log("All Booking Data")
})
addRouter.post("/add",async(req,res)=>{
    const payload=req.body;
    let data=new AddDataModel(payload);
    await data.save();
    res.send(data)
    console.log("Shopdata and Booking Details added to backend")
})
module.exports={addRouter}


///FD
// kasndakmamasddofeof
// adfmasmakmdmd
//aksmdfksmkmfkmd
