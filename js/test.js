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
  let basket = JSON.parse(localStorage.getItem("basket") || "[]");
  console.log(basket);
  let x = " ";
  for (let i = 0; i < products.length; i++) {
    x += `<div class="product">
        <div class="foto"></div>
        <h1>${products[i].name}</h1>
        <p>${products[i].price}</p>
        ${
          basket.find((x) => x.id == products[i].id)
            ? `<h3  onclick="productsRemove(${products[i].id})" id="removeBasket${products[i].id}">remove to Basket</h3>`
            : `<h3 onclick="addBasket(${products[i].id})" id="addBasket${products[i].id}">add to Basket</h3>`
        }
        
        
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

  renderBasket();
}

function renderBasket() {
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
  let x;
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

  productNumbers();
  render();
}

function remove(n) {
  let basket = JSON.parse(localStorage.getItem("basket") || "[]");
  let basketList = [];
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id != n) {
      basketList.push(basket[i]);
    }
  }

  localStorage.setItem("basket", JSON.stringify(basketList));

  renderBasket();
  productNumbers();
}

function productNumbers() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  let productNumbers = document.getElementById("productNumbers");
  if (basket.length > 0) {
    productNumbers.style.display = "block";
  } else {
    productNumbers.style.display = "none";
  }
  productNumbers.innerHTML = basket.length;
}

function productAddRemove() {
  let products = JSON.parse(localStorage.getItem("products"));
  let basket = JSON.parse(localStorage.getItem("basket"));
  for (let i = 0; i < products.length; i++) {
    for (let a = 0; a < basket.length; a++) {
      if (basket[a].id == products[i].id) {
        document.getElementById(`addBasket${products[i].id}`).style.display =
          "none";
        document.getElementById(`removeBasket${products[i].id}`).style.display =
          "block";
      } else {
        document.getElementById(`addBasket${products[i].id}`).style.display =
          "block";
        document.getElementById(`removeBasket${products[i].id}`).style.display =
          "none";
      }
    }
  }
}

function productsRemove(n) {
  let baskets = JSON.parse(localStorage.getItem("basket"));
  let newBasket = [];
  for (let i = 0; i < baskets.length; i++) {
    if (n != baskets[i].id) {
      newBasket.push(baskets[i]);
    }
  }
  console.log(newBasket);
  localStorage.setItem("basket", JSON.stringify(newBasket));
  render();
}
productNumbers();
render();
