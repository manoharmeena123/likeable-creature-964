let shpname = JSON.parse(localStorage.getItem("shopDetails"));
let past_data = JSON.parse(localStorage.getItem("upcoming"));
console.log("past", past_data);

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

let selecttime = document.getElementById("sltime");

let append = (data) => {
  data.forEach((el) => {
    let div1 = document.createElement("div");
    div1.setAttribute("id", "timelist");

    let time = document.createElement("h4");
    time.setAttribute("id", "selectedtime");
    time.innerText = `${el}`;

    div1.addEventListener("click", () => {
      if (startdate.value == "") {
        return alert("Select date first");
      } else {
        console.log("you got the date");
        past_data["time"] = el;
        past_data["date"] = startdate.value;
        window.location.href = "./payment_review.html";
      }
    });

    div1.append(time);
    selecttime.append(div1);
  });
};
let data = JSON.parse(localStorage.getItem("shopDetails"));
let res = data["availableTime"];
append(res);

localStorage.setItem("pastdata", JSON.stringify(past_data));
