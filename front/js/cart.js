// lire item cart
let cart = getCart();

function createCustomElement(container, type, css) {
  const elt = document.createElement(type);
  container.appendChild(elt);
  if (css) {
    elt.className = css;
  }
  return elt;
}

//initialisation variable
function getCart() {
  let items = [];
  if (localStorage.getItem("itemsArray") != null) {
    items = localStorage.getItem("itemsArray");
  }
  return JSON.parse(items);
}

console.log(cart);

document.getElementById("cart_items");

for (item of cart) {
  const article = createCustomElement(cart__items, "article", "cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  const divImage = createCustomElement(article, "div", "cart__item__img");
  const img = createCustomElement(divImage, "img");
  img.src = item.imageUrl;

  console.log(img.src);

  const divContent = createCustomElement(article, "div", "cart__item__content");
  const divContentDescription = createCustomElement(divContent, "div", "cart__item__content__description");
  const h2Item = createCustomElement(divContentDescription, "h2");
  h2Item.textContent = item.name;
  const pColor = createCustomElement(divContentDescription, "p");
  pColor.textContent = item.color;
  const pPrice = createCustomElement(divContentDescription, "p");
  pPrice.textContent = item.price + " €";

  console.log(item);

  const divContentSettings = createCustomElement(divContent, "div", "cart__item__content__settings");
  const divContentSettingsQuantity = createCustomElement(divContentSettings, "div", "cart__item__content__settings__quantity");
  const pQuantity = createCustomElement(divContentSettingsQuantity, "p");
  pQuantity.textContent = "Qté : ";
  const inputQuantity = createCustomElement(divContentSettingsQuantity, "input");
  inputQuantity.value = item.quantity;
  inputQuantity.type = "number";
  inputQuantity.className = "itemQuantity";
  inputQuantity.name = "itemQuantity";
  inputQuantity.min = "1";
  inputQuantity.max = "100";
  inputQuantity.addEventListener("change", updateKanap);

  // modification et supression
  const divContentSettingsDelete = createCustomElement(divContentSettings, "div", "cart__item__content__settings__delete");
  const pDelete = createCustomElement(divContentSettingsDelete, "p");
  pDelete.textContent = "Supprimer";
  pDelete.className = "deleteItem";
  pDelete.addEventListener("click", deleteKanap);
}

//Supprimer le canapé
function deleteKanap(event) {
  let deleteButtonKanap = event.currentTarget;
  let kanapElement = deleteButtonKanap.closest('.cart__item');
  const kanapId = kanapElement.dataset.id;
  const kanapColor = kanapElement.dataset.color;
  let indexItem = cart.findIndex(function (item) { return item.id === kanapId && item.color === kanapColor; });

  console.log("kanap à effacer : " + indexItem);

  cart.splice(indexItem, 1);
  localStorage.setItem('itemsArray', JSON.stringify(cart));
  console.log('kanap supprimé', cart);
  cart__items.removeChild(kanapElement);
  cartTotal();
}

// Modification canapé (update)
function updateKanap(item) {

  console.log("updateKanap");


  // if(item.target.value>=1 || item.target.value<=100){
  //   console.error("La quantité doit être comprise entre 1 et 100");



  let kanapElement = item.target.closest('.cart__item');
  const kanapId = kanapElement.dataset.id;
  const kanapColor = kanapElement.dataset.color;
  let indexItem = cart.findIndex(function (item) { return item.id === kanapId && item.color === kanapColor; });

  console.log(indexItem, kanapId, kanapColor);

  let quantity = parseInt(item.target.value);
  cart[indexItem].quantity = quantity;
  localStorage.setItem('itemsArray', JSON.stringify(cart));
  cartTotal();
}
}

//Total panier
cartTotal();

function cartTotal() {
  let total = 0;
  let totalItems = 0;

  for (let itemInCart of cart) {
    total += itemInCart.price * itemInCart.quantity;
    totalItems += itemInCart.quantity;
  }

  let displayTotalCart = document.getElementById("totalPrice");
  displayTotalCart.textContent = total;
  let displayTotalItemsInCart = document.getElementById("totalQuantity");
  displayTotalItemsInCart.textContent = totalItems;
}

let commands = document.querySelector("#order");
const regExpText = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{1,30}$/;
const regExpAddress = /^[0-9A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{1,30}$/;
const regExpEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i;
commands.addEventListener('click', validateInput); // bouton : Commande

// recup des inputs du formulaire 
function validateInput(event) {
  let errFirst = false;
  let errLast = false;
  let errCity = false;
  let errMail = false;
  let errAdress =false;
  
  event.preventDefault(); // annule les évenements par defaut
  const inputfirstName = document.querySelector('#firstName').value;
  console.log(inputfirstName, inputfirstName.match(regExpText));
  if (inputfirstName.match(regExpText) == null) {
    let errorfirstName = document.querySelector('#firstNameErrorMsg');
    errorfirstName.textContent = "Champs Obligatoire";
    errFirst = true;
  }
  else {
    errFirst=false;}
  
  const inputLastName = document.querySelector('#lastName').value;
  console.log(inputLastName, inputLastName.match(regExpText));
  if (inputLastName.match(regExpText) == null) {
    let errorlastName = document.querySelector('#lastNameErrorMsg');
    errorlastName.textContent = "Champs Obligatoire";
    errLast = true;
  } 
  else {
    errLast=false;}

  const inputAddress = document.querySelector('#address').value;
  console.log(inputAddress, inputAddress.match(regExpAddress));
  if (inputAddress.match(regExpAddress) == null) {
    let errorAddress = document.querySelector('#addressErrorMsg');
    errorAddress.textContent = "Champs Obligatoire";
    errAdress=true;
  } 
  else {
    errAdress=false;
  }
  
  const inputCity = document.querySelector('#city').value;
  console.log(inputCity, inputCity.match(regExpText));
  if (inputCity.match(regExpText) == null) {
    let errorCity = document.querySelector('#cityErrorMsg');
    errorCity.textContent = "Champs Obligatoire";
    errCity=true;
  } 
  else {
    errCity=false;
  }
  const inputEmail = document.querySelector('#email').value;
  console.log(inputEmail, inputEmail.match(regExpEmail));

  if (inputEmail.match(regExpEmail) == null) {
    let errorEmail = document.querySelector('#emailErrorMsg');
    errorEmail.textContent = "Champs Obligatoire";
    errMail=true;
  } 
  else {
    errMail=false;
  }

  //verification
  if (!errFirst && !errLast && !errCity && !errMail) {
    console.log("fonction BOUTON ok");
    let cart = getCart();
    let products = cart.map((item) => item.id)
    let user = {
      firstName: inputfirstName,
      lastName: inputLastName,
      address: inputAddress,
      city: inputCity,
      email: inputEmail
    }
    sendOrder(user, products)
  }
}

function sendOrder(user, products) {
  // url de l'API
  const API = "http://localhost:3000/api/products/order";

  let data = {
    contact: user,
    products: products
  }
  console.log(data);
  fetch(API, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
.then(response => response.json())
  .then ((response) => {
    localStorage.clear();
    let IdOrder = response.orderId;
    document.location.href = `../html/confirmation.html?id=${IdOrder}`
})
}