let shpname = JSON.parse(localStorage.getItem("shopDetails"));
let past_data = JSON.parse(localStorage.getItem("upcoming"));
let cu_email = localStorage.getItem("email")
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
let choosedate = document.getElementById("choose");

let append = (data) => {
  data.forEach((el) => {
    let div1 = document.createElement("div");
    div1.setAttribute("id", "timelist");

    let time = document.createElement("h4");
    time.setAttribute("id", "selectedtime");
    time.innerText = `${el}`;

    div1.addEventListener("click", () => {
      if (startdate.value == "") {
        return (
          (choosedate.style.color = "#D50000"),
          (choosedate.style.textShadow = "1px 1px black"),
          (choosedate.innerText = "\u{26A0} Please Select The Date")
        );
      } else {
        console.log("you got the date");
        choosedate.style.color = "#00C853";
        choosedate.style.textShadow = "1px 1px black";
        choosedate.innerText = "\u{2713} Awesome";
        past_data["time"] = el;
        past_data["date"] = startdate.value;
        past_data["email"] = cu_email;
        past_data["salon"] = shpname
        localStorage.setItem("orderData", JSON.stringify(past_data));


        setTimeout(() => {
          window.location.href = "./confirmation_page.html";
        }, 2000);
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
