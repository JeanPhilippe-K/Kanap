//lecture Id dans la barre d'adresse
const params = new URLSearchParams(window.location.search)
const kanapId = params.get("id")

console.log(kanapId);

function createCustomElement(container, type, css) {
  const elt = document.createElement(type);
  container.appendChild(elt);
  if (css) {
    elt.className = "item__img";
  }
  return elt;
}

//recuperation canapé LocalStorage
let kanaps = JSON.parse(localStorage.getItem("kanaps"))
console.log(kanaps);
let kanap = kanaps[kanapId];
console.log(kanap);
let name = document.querySelector("#name");
title.textContent = kanap.name;
let image = document.querySelector(".item__img > img");
image.src = kanap.imageUrl;
let price = document.querySelector("#price");
price.textContent = kanap.price;
let description = document.querySelector("#description");
description.textContent = kanap.description;

console.log(kanap);

let selectcolors = document.querySelector("#colors");

for (let color of kanap.colors) {
  const option = createCustomElement(selectcolors, "option");
  console.log(option);
  option.textContent = color;
  option.value = color;

  console.log(option);

}
// bouton
console.log(localStorage.getItem("itemsArray"));

let button = document.querySelector("#addToCart");
button.addEventListener("click", ()=> {
  let color = selectcolors.value;
  let quantitykanap = quantity.value;
  console.log(kanap,color,quantitykanap);
  addToCart(kanap,quantitykanap,color);
});

function saveCart(kanap) {
  localStorage.setItem("itemsArray", JSON.stringify(kanap));
}

function getCart() {
  let cart = localStorage.getItem("itemsArray");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function addToCart(kanap,quantity,color) {

  console.log("addtocart function");

  let cart = getCart();

  console.log("mon panier : " + cart);

  let itemQuantity = parseInt(document.querySelector("#quantity").value);
  let foundKanap = cart.find (foundKanap => foundKanap.id == kanap.id);
  console.log("find", kanap._id, color, kanap.color);
  let itemInCart = cart.find(item => item.id == kanap._id && color == item.color);

  console.log(itemInCart);

  if (itemInCart == undefined) {
    let item = {};
    item.quantity = itemQuantity;
    item.color = color;
    item.id = kanapId;
    item.imageUrl = kanap.imageUrl;
    item.altTxt = kanap.altTxt;
    item.price = kanap.price;
    item.name = kanap.name;
    
    cart.push(item);
    saveCart(cart);
  } 
  else {
    itemInCart.quantity += itemQuantity
    saveCart(cart);
  }
  //fenêtre pop-up
    
  alert('Votre commande de ' + itemQuantity + ' ' + kanap.name + ' ' + color + ' est bien ajoutée au panier !');
  window.location.reload();
}