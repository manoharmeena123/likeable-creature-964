 let shopData = JSON.parse(localStorage.getItem("shopDetails"))
//Order details
let order_data = JSON.parse(localStorage.getItem("pastdata"))
 let serArray=[];
  let servicesNameData=pastData.services;
  for(let i=0;i<servicesNameData.length;i++){
    serArray.push(servicesNameData[i].serviceName)
  }


const sendData=()=>{
    let res=fetch('htttp://localhost:8000/addDataToBackend/add',{
        method:"POST",
        body:{
            name:shopData.name,
            location:shopData.location,
            image:shopData.image,
            date:order_data.date,
            time:order_data.time,
            services:serArray
        },
          headers: {
      "Content-Type": "application/json",
    },
    })
}
sendData()