///////////// Carte Produit dans le code HTML /////////
function addProductsList(products,section){
  const figure = document.createElement("figure") ;
  figure.innerHTML = products.name;
  figure.setAttribute ("class", "col-md-5 products mt-5 col-sm-6 mr-4 ml-4 border border-dark shadow");

  const img = document.createElement("img");
  img.setAttribute ("src", products.imageUrl);
  img.setAttribute ("width","100%");

  const figcaption = document.createElement("figcaption");
  figcaption.innerHTML = products.description;

  const lenses = document.createElement("p");
  lenses.innerHTML = "Choix des lentilles: " + products.lenses;

  const price = document.createElement("p");
  price.innerHTML = products.price/100 + "€";
  price.setAttribute ("class","product_price");

  const button = document.createElement("a");
  button.setAttribute ("href","produit.html?id=" + products._id);
  button.setAttribute ("class","btn btn-dark offset-4 col-4 mb-3");
  button.innerHTML ="Détails";

  ///////////////////////////////// Arborescence des balises////////////////////////////////////
  section[1].appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  figcaption.appendChild(lenses);
  figcaption.appendChild(price);
  figcaption.appendChild(button);
}

//////////////////////////////////// Requête envoyée à l'API et affichage des produits/////////////////
get("http://localhost:3000/api/cameras")
.then (function (products) {
const section = document.getElementsByClassName("row");

////////////////////////////////////  Tableau des appareils photos /////////////////////////////////////
for (let i=0; i< products.length; i++){
  addProductsList (products[i],section);  
  }
  })
  .catch(function (err){
  console.log (err);
  if (err === 0){
    alert ("serveur Hors Service");
  }
  });