var myButton = document.getElementById("apointmentsbtn");
var myPopup = document.getElementById("myPopup");
var closePopup = document.getElementById("close-btn");

document.querySelector("#logo").addEventListener("click",()=>{
  window.location.href = "index.html"
})

myButton.onclick = function() {
  myPopup.style.display = "block";
}

closePopup.onclick = function() {
  myPopup.style.display = "none";
}


// close btn
var myPopup1 = document.getElementById("myPopup1");

const popbtn2=document.getElementById("pop-btn2");

popbtn2.onclick=function(){
  myPopup1.style.display="block"
}

//Shop Details
let shopData = JSON.parse(localStorage.getItem("shopDetails"))

//Order details
let order_data = JSON.parse(localStorage.getItem("orderData"))
//*************DATA STRUCTURE************* */
// let order_data = {
//   services : [
//       {servicesName:"Hair-cut", price: 100},
//       {servicesName:"Hair-cut", price: 100}
//   ],
//   total: 200,
//   date: "11-01-2023",
//   time: "10:30 AM"
// }

// console.log(order_data);
// console.log(shopData);



function renderAll(orderStatus){
  let status_box = document.querySelector("#status")

  if(orderStatus == true){
    status_box.style.backgroundColor = "green";
    status_box.innerHTML = `
      <div style="display: flex">
        <i class="fa fa-check" style="font-size:23px; margin-left: 5px;"></i>
        <p>Confirmed</p>
      </div>
    `
  }else{
    status_box.style.backgroundColor = "red";
    status_box.innerHTML = `
      <div style="display: flex">
      <i class="fa fa-close" style="font-size:23px; margin-left: 5px"></i>
        <p>Canceled</p>
      </div>
    `
  }

  //Order date & time
  document.querySelector("#day").innerHTML = `Date: ${order_data.date} At ${order_data.time}`
 
  //Salon name
  document.querySelector("#salon").innerHTML = shopData.name

  //services details
  let serviceBox = document.querySelector("#service_detail")
  serviceBox.innerHTML = ""

  let send_services = order_data.services.map((ele)=>{
    return `
      <div class="apoint-for-child-1">
          <p>${ele.serviceName}</p>
          <p>&#8377 <span>${ele.price}</span></p>
      </div>
    `
  })

  serviceBox.innerHTML = send_services.join(" ")

  //Add Total price amount
  let amo = document.querySelector("#total_amo")
  amo.innerHTML = `
    <div class="apoint-for-child-2">
      <h3>total</h3>
      <h3>&#8377 <span>${order_data.total}</span></h3>
    </div>
  `

  //Referal number
  let refe = document.querySelector("#ref")
  refe.innerHTML = `
    <h4>Booking ref :  <span>${Math.floor(Math.random() * 9000001) + 1000000}</span></h4>
  `
  // Left Order details card
  let leftCardOrder = document.querySelector("#ua-data")
  leftCardOrder.innerHTML = `
    <div style="padding: 5px 0px; cursor: pointer;" class="apointment-card">
    <div class="card-img-div">
        <!-- add image here -->
        <img class="salon-img-src" src=${shopData.image} alt="salon">
    </div>
    <div class="description-div">
        <!-- add description here -->
        <p id="l-fix" style=" color: ${orderStatus?"green" : "red"};">Date: ${order_data.date} At ${order_data.time}</p>
        <h4 style="margin-left: 14px; color:blue;">${shopData.name}</h4>
        <p>Total: ${order_data.total}</p>
    </div>
  `

  // Map append
  let map = document.getElementById("map");
  map.src = `https://maps.google.com/maps?q=${shopData.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

}

let orderStatus = true;
renderAll(orderStatus)

let cancelOrder = document.querySelector("#pop-btn2")
cancelOrder.addEventListener("click",()=>{
  let spin = document.querySelector("#spinner")
  spin.style.display = "block";
  orderStatus = false
  myPopup.style.display = "none";
  setTimeout(()=>{
    spin.style.display = "none";
    // spin.style.margin-left = "-30%";
    renderAll(orderStatus)
  },2000)
})

//Reschedule Button
  document.querySelector("#pop-btn1").addEventListener("click", ()=>{
    window.location.href = "select_time.html"
  })

  //Send mail To Customer through our email id

  async function sentMail(){
    try {
      let res = await fetch("https://long-pear-slug-belt.cyclic.app/book/appo", {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              Authorization:localStorage.getItem("token")
          },
          body: JSON.stringify(order_data)
      })
    } catch (error) {
        alert("Something Went wrong")
        console.log(error);
    }
  }
  sentMail()