let shpname = JSON.parse(localStorage.getItem("shopDetails"));

let simage = document.getElementById("ad1");
simage.style.width = "150px";
simage.style.marginTop = "10px";
simage.src = shpname["image"];
let sname = document.getElementById("ad2");
sname.innerText = shpname["name"];
let sadd = document.getElementById("ad3");
sadd.innerText = shpname["location"];

let total = document.getElementById("total");
let totalamount = JSON.parse(localStorage.getItem("totalamount"));
total.innerText = `Rs. ${totalamount}.00/-`;

const startdate = document.getElementById("startDate");
let starttime = document.getElementById("timelist");

let nextbtn = document.getElementById("next");
nextbtn.addEventListener("click", async () => {
  alert("clicked");
  let obj = {
    startdate: startdate.value,
    starttime: starttime.value,
  };
  console.log(obj);

  let event = await fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  //   let res = await event.json();
  //   console.log(res);
});

let selecttime = document.getElementById("sltime");

let append = (data) => {
  data.forEach((el) => {
    let div = document.createElement("div");
    div.setAttribute("id", "timelist");

    let time = document.createElement("h4");
    time.innerText = `${el + " " + ">"}`;

    div.append(time);
    selecttime.append(div);
  });
};
let data = JSON.parse(localStorage.getItem("shopDetails"));
let res = data["availableTime"];
append(res);
