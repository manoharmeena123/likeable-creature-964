const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
const SalonSchema = mongoose.Schema({
    name: "string",
    image: "string",
    location: "string",
    rating: "number",
    services: [{
        servicesName: "string",
        price: "string"
    }],
    availableTime: ["string"]
},{versionKey:false})

const ProjectModel = mongoose.model("product",SalonSchema);


module.exports = {ProjectModel};



// store our shops data -name ,image,location,rating  
//  services = {}
                          
// name: "natural",
//discription: "........",
//avatar:"wqwetwrwtewr",
//location:"mumbai",
//rating: 7.7,
//service : [{name:"hair cut",price:130}, {name:"hair spa", price: 300}]