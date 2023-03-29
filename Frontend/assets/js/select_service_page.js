let all_services = document.getElementById("left");

let append = (data) => {
  console.log(data);
  data.forEach((el) => {
    let div = document.createElement("div");
    div.setAttribute("id", "card");

    let div1 = document.createElement("div");
    div1.setAttribute("id", "left1");

    let select = document.createElement("input");
    select.setAttribute("type", "checkbox");

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
};

function get_services_data() {
  //fetch the data and then append it using append(data)

  let data = [
    {
      title: "natural hair colour",
      price: "250",
    },
    {
      title: "natural hair colour",
      price: "    850",
    },
    {
      title: "natural hair colour",
      price: "250",
    },
  ];
  append(data);
}
get_services_data();
