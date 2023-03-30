const express = require("express");
const { ProjectModel } = require("../models/projects.model");
const ProjectRouter = express.Router();

//get all projects
ProjectRouter.get("/fetch",async(req,res)=>{
    let allProjects = await ProjectModel.find();
    res.send(allProjects);
})
//get projects based on user 

ProjectRouter.get("/",async(req,res)=>{
   try{
   //let userId = req.params.id;
   
   let data = await ProjectModel.find()
   res.send(data);
   }catch(err){
    console.log("error in projects | get by userId",err)
   }
})

//=====>  Regex for search Using location    <=============//
//==>>>Sample URL => localhost:8000/product/search?location=goa
ProjectRouter.get("/search/", async (req,res)=>{
   //let searchLocation = req.params
   let locationQuery = req.query
   try {
      let loca = locationQuery.location
      let data = await ProjectModel.find({location: { $regex: loca, $options: 'i'}})
      res.send(data)
   } catch (error) {
      console.log(error);
      res.status(404).send("Something went wrong")
   }
})

//post 
ProjectRouter.post("/add",async(req,res)=>{
   //let {name, image, loaction, rating, services, availableTime}=req.body;
   try {
      //let newPro =
      await ProjectModel.insertMany(req.body);
      //await newPro.save()
      //console.log(req.body);
      res.send("data inserted")
   } catch (error) {
      console.log(error);
      res.status(422).json({err:"fill all the nescessary entries"})
   }
   // if(!projectName || !clientId){res.status(422).json({err:"fill all the nescessary entries"})}
   // else{
   //  let newPro = new ProjectModel(req.body);
   //  let out = await newPro.save();
   //  res.send(out);
   // }
})

//delete 

ProjectRouter.delete("/:id",async(req,res)=>{
  let _id = req.params.id;
  let out = await ProjectModel.findByIdAndDelete(_id);
  res.send("deleted successfully")

})





module.exports={ProjectRouter};