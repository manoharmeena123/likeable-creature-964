const express = require("express");
const { ProjectModel } = require("../models/projects.model");
const ProjectRouter = express.Router();

//get all projects
ProjectRouter.get("/fetch",async(req,res)=>{
    let allProjects = await ProjectModel.find();
    res.send(allProjects);
})
//get projects based on user 

ProjectRouter.get("/:id",async(req,res)=>{
   try{
   let userId = req.params.id;
   
   let data = await  ProjectModel.find({userId})
   res.send(data);
   }catch(err){
    console.log("error in projects | get by userId",err)
   }
})




//post 
ProjectRouter.post("/add",async(req,res)=>{
   let {projectName,clientId}=req.body;
   if(!projectName || !clientId){res.status(422).json({err:"fill all the nescessary entries"})}
   else{
    let newPro = new ProjectModel(req.body);
    let out = await newPro.save();
    res.send(out);
   }
})

//delete 

ProjectRouter.delete("/:id",async(req,res)=>{
  let _id = req.params.id;
  let out = await ProjectModel.findByIdAndDelete(_id);
  res.send("deleted successfully")

})





module.exports={ProjectRouter};