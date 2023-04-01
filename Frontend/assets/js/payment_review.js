let shpname = JSON.parse(localStorage.getItem("shopDetails"));

let totalamt = document.getElementById("total");
let simage = document.getElementById("ad1");
simage.style.width = "150px";
simage.style.marginTop = "10px";
simage.src = shpname["image"];
let sname = document.getElementById("ad2");
sname.innerText = shpname["name"];
let sadd = document.getElementById("ad3");
sadd.innerText = shpname["location"];

let totalamount = JSON.parse(localStorage.getItem("totalamount"));
console.log(totalamount);
let total = document.getElementById("total");
total.innerText = `Rs. ${totalamount}.00/-`;

document.querySelector("#book>button").addEventListener("click", () => {
  window.location.href = "";
});
