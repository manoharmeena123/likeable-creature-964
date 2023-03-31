let all_services = document.getElementById("left");
let total = 0;
let flag = false;

let shpname = JSON.parse(localStorage.getItem("shopDetails"));
// console.log("tyu", shpname["name"]);
// console.log(shpname["image"]);
// console.log(shpname["location"]);

let totalamt = document.getElementById("total");
let simage = document.getElementById("ad1");
simage.style.width = "150px";
simage.style.marginTop = "10px";
simage.src = shpname["image"];
let sname = document.getElementById("ad2");
sname.innerText = shpname["name"];
let sadd = document.getElementById("ad3");
sadd.innerText = shpname["location"];
// let nm = document.querySelector(".nm");
// let pr = document.querySelector(".pr");
let added1 = document.getElementById("added1");

let append = (data) => {
  console.log(data);
  data.forEach((el) => {
    let d = document.createElement("div");
    d.setAttribute("id", "xyz");
    d.style.display = "flex";
    d.style.justifyContent = "space-between";

    let div = document.createElement("div");
    div.setAttribute("id", "card");

    let div1 = document.createElement("div");
    div1.setAttribute("id", "left1");

    let select = document.createElement("input");
    select.setAttribute("type", "checkbox");
    select.addEventListener("click", (event) => {
      //total=total+(+el.price) when select
      // total = total + 50; //testing
      //total=total-(+el.price) when deselect

      if (select.checked == true) {
        alert("Added to your list");
        // nm.innerText = el.title;
        // pr.innerText = el.price;
        let name = document.createElement("h3");
        name.innerText = el.servicesName.substring(0, 16) + "..";
        let pc = document.createElement("h3");
        pc.innerText = `Rs. ${parseFloat(el.price.replace(/[^\d\.]/g, ""))}/-`;
        d.append(name, pc);
        added1.append(d);

        total = total + +parseFloat(el.price.replace(/[^\d\.]/g, ""));
        totalamt.innerText = `Rs. ${total}/-`;
        localStorage.setItem("totalamount", JSON.stringify(total));
      } else if (select.checked == false) {
        alert("Removed from your list");

        console.log("before", d);
        d.remove();

        d = document.createElement("div");
        d.setAttribute("id", "xyz");
        d.style.display = "flex";
        d.style.justifyContent = "space-between";

        console.log("after", d);

        total = total - +parseFloat(el.price.replace(/[^\d\.]/g, ""));
        totalamt.innerText = `Rs. ${total}/-`;
        localStorage.setItem("totalamount", JSON.stringify(total));
      }
    });

    div1.append(select);

    let div2 = document.createElement("div");
    div2.setAttribute("id", "left2");

    let title = document.createElement("h2");
    title.innerText = el.servicesName.substring(0, 16) + "..";

    let price = document.createElement("h3");
    price.innerText = `Rs. ${parseFloat(el.price.replace(/[^\d\.]/g, ""))}/-`;

    div2.append(title, price);

    div.append(div1, div2);
    all_services.append(div);
  });
  totalamt.innerText = `Rs. ${total}/-`;
  localStorage.setItem("totalamount", JSON.stringify(total));
};

function get_services_data() {
  //fetch the data and then append it using append(data)

  let data = JSON.parse(localStorage.getItem("list"));
  // console.log("data", data[0]);
  append(data);
}
get_services_data();

document.querySelector("#book>button").addEventListener("click", () => {
  window.location.href = "./select_time.html";
});
