// url de l'API
const API = "http://localhost:3000/api/products/";
const items = document.querySelector(".items");

fetch(API)
  .then((response) => response.json())
  .then((kanaps) => {
    console.log(kanaps);
  

let kanaps0bject = {}
console.log(kanaps);
    for (kanap of kanaps){
      const a = createCustomElement (items,"a");
      a.href= "./product.html?id="+kanap._id
      const article = createCustomElement (a,"article");
      const h3 = createCustomElement (article,"h3","productName");
      h3.textContent = kanap.name;
      const img = createCustomElement (article,"img");
      img.src=kanap.imageUrl;
      const p = createCustomElement (article,"p","productDescription");
      p.textContent = kanap.description;
      kanaps0bject[kanap._id]=kanap
}

console.log(kanaps0bject);

// enregistre le contenu dans le localstorage
  localStorage.setItem("kanaps", JSON.stringify(kanaps0bject));
})

function createCustomElement(container,type,css){
  const elt = document.createElement(type);
  container.appendChild(elt);
  if(css){
      elt.className = "item__img";
  }
  return elt;
}