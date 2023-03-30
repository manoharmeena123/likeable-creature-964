let all_services = document.getElementById("left");
let total = 0;
let flag = false;
let totalamt = document.getElementById("total");
let simage = document.getElementById("ad1");
// simage.src = "";
let sname = document.getElementById("ad2");
// sname.innerText = "";
let sadd = document.getElementById("ad3");
// sadd.innerText = "";
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
    select.addEventListener("click", () => {
      //total=total+(+el.price) when select
      // total = total + 50; //testing
      //total=total-(+el.price) when deselect

      if (select.checked == true) {
        alert("Added to your list");
        // nm.innerText = el.title;
        // pr.innerText = el.price;
        let name = document.createElement("h3");
        name.innerText = el.title;
        let pc = document.createElement("h3");
        pc.innerText = `Rs. ${el.price}/-`;
        d.append(name, pc);
        added1.append(d);
        total = total + +el.price;
        totalamt.innerText = `Rs. ${total}/-`;
      } else if (select.checked == false) {
        alert("Removed from your list");
        total = total - +el.price;
        totalamt.innerText = `Rs. ${total}/-`;
      }
    });

    div1.append(select);

    let div2 = document.createElement("div");
    div2.setAttribute("id", "left2");

    let title = document.createElement("h2");
    title.innerText = el.title;

    let price = document.createElement("h3");
    price.innerText = `Rs. ${+el.price}.00/-`;

    div2.append(title, price);

    div.append(div1, div2);
    all_services.append(div);
  });
  totalamt.innerText = `Rs. ${total}/-`;
};

function get_services_data() {
  //fetch the data and then append it using append(data)

  let data = [
    {
      title: "Natural hair colour",
      price: "1160",
    },
    {
      title: "Massage",
      price: "    950",
    },
    {
      title: "Skin care",
      price: "4100",
    },
    {
      title: "Natural hair colour",
      price: "1160",
    },
    {
      title: "Massage",
      price: "    950",
    },
    {
      title: "Skin care",
      price: "4100",
    },
    {
      title: "Natural hair colour",
      price: "1160",
    },
    {
      title: "Massage",
      price: "    950",
    },
    {
      title: "Skin care",
      price: "4100",
    },
    {
      title: "Natural hair colour",
      price: "1160",
    },
    {
      title: "Massage",
      price: "    950",
    },
    {
      title: "Skin care",
      price: "4100",
    },
  ];
  append(data);
}
get_services_data();

document.querySelector("#book>button").addEventListener("click", () => {
  window.location.href = "./select_time.html";
});
