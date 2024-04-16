function create() {
  let products = JSON.parse(localStorage.getItem("products") || "[]");
  let maksID = 0;
  for (let i = 0; i < products.length; i++) {
    if (maksID < products[i].id) {
      maksID = products[i].id;
    }
  }
  let x = {
    id: maksID + 1,
    name: document.getElementById("productName").value,
    price: Number(document.getElementById("productPrice").value),
    picture: " ",
  };
  products.push(x);
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

function render() {
  let products = JSON.parse(localStorage.getItem("products") || "[]");
  let x = " ";
  for (let i = 0; i < products.length; i++) {
    x += `<div class="product">
        <div class="foto"></div>
        <h1>${products[i].name}</h1>
        <p>${products[i].price}</p>
        <h3 onclick="addBasket(${products[i].id})">add to Basket</h3>
       </div>`;
  }
  document.getElementById("products").innerHTML = x;
}
function basketOpen() {
  let basket = document.getElementById("basketProduct").style.display;
  if (basket == "none") {
    document.getElementById("basketProduct").style.display = "flex";
  } else if (basket == "flex") {
    document.getElementById("basketProduct").style.display = "none";
  }
  let basket2 = JSON.parse(localStorage.getItem("basket") || "[]");
  let a = " ";
  for (let i = 0; i < basket2.length; i++) {
    a += `  <div class="product">
<div class="foto"></div>
<h1>${basket2[i].name}</h1>
<p>${basket2[i].price}</p>
<h3 onclick="remove(${basket2[i].id})">remove</h3>
</div>`;
  }
  console.log(a);
  document.getElementById("basketProducts").innerHTML = a;
  let price = 0;
  for (let i = 0; i < basket2.length; i++) {
    price += basket2[i].price;
  }
  document.getElementById("price").innerHTML = `Total price:${String(price)}`;
}

function addBasket(n) {
  let products = JSON.parse(localStorage.getItem("products") || "[]");
  let basket = JSON.parse(localStorage.getItem("basket") || "[]");
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == n) {
      x = products[i];
    }
  }
  let t = true;
  for (let i = 0; i < basket.length; i++) {
    if (x.id == basket[i].id) {
      t = false;
      break;
    }
  }

  if (t == true) {
    basket.push(x);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function remove(n) {
  let basket = JSON.parse(localStorage.getItem("basket") || "[]");
  let basketList = [];
  for (let i = 0; i < basket.length; i++) {
    if (basket.length == 1) {
      localStorage.setItem("basket", []);
    } else if (basket[i].id != n) {
      basketList.push(basket[i]);
      localStorage.setItem("basket", JSON.stringify(basketList));
    }
  }
  location.reload();
}
render();
