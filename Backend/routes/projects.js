const express = require("express");
const { ProjectModel } = require("../models/projects.model");
const ProjectRouter = express.Router();


// *****************//
// GET ALL USERS
// ProjectRouter.get("/search/", async (req, res) => {
//    let AllData= req.query.location ? {
//        $or: [
//              { location: { $regex:AllData, $options: "i" } }
//        ]
//    }:{};
//    try {
//        const data = await ProjectModel.find(AllData)
//      res.send(data);
//      console.log(data);
//    } catch (error) {
//        res.send("err:Not able to get the all salons data");
//        console.log(error);
//    }
// });

ProjectRouter.get("/search/", async (req, res) => {
   let AllData= req.query
   try {
      // let getlocation=AllData.location
       const data = await ProjectModel.find({location:{$regex:AllData.location,$options:"i"}})
     res.send(data);
   } catch (error) {
       res.send("err:Not able to get the all salons data");
       console.log(error);
   }
});



// **********//

//get all projects
// ProjectRouter.get("/fetch",async(req,res)=>{
//     let allProjects = await ProjectModel.find();
//     res.send(allProjects);
// })
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