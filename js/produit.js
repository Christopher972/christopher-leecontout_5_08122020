///////////// Crétation de la constante contenant L'Id /////////////
const params = new URLSearchParams( window.location.search);
const id = params.get("id");

///////////// Appel du produit sélectionné ///////////
get("http://localhost:3000/api/cameras/" + id)
.then(function(product){
    addProduct(product);
})
.catch(function (err){
    console.log (err);
    if (err === 0){
      alert ("serveur Hors Service");
    }
});

//////////////////////////////////////Caractéristique du produit (id + lentilles + quantités)//////////////
class Product{
constructor(id, lenseSelected){
    this.id = id;
    this.lenses = lenseSelected;    
} 
} 
///////////// Information du Produit dans le code HTML /////////
function addProduct(product){
const container = document.getElementById("productFocus");

const figure = document.createElement("figure");
figure.setAttribute( "class","product offset-1 col-10 col-md-6 offset-md-3 mt-5 mb-5 p-3 border border-dark shadow");

const img = document.createElement("img");
img.setAttribute ("src", product.imageUrl);
img.setAttribute ("width","100%");

const h2 = document.createElement("h2");
h2.innerHTML = product.name;
h2.setAttribute("class","productTitle text-center mb-4 ");

const figcaption =document.createElement("figacaption");
figcaption.innerHTML = product.description;

const price = document.createElement("p");
price.innerHTML = product.price/100 + "€";
price.setAttribute("class","productPrice mt-3");

/////////////////// Choix des lentilles /////////////////////////
const lenses = document.getElementById("lenses-selected");

const select = document.getElementById("option");

for (let i=0; i< product.lenses.length; i++){
    const option = document.createElement("option");
    option.setAttribute("value", product.lenses[i]);
    option.innerHTML = product.lenses[i];
    lenses.appendChild(option);
}   
const number = document.getElementById("numberArticle");

//////////////////// Bouton ajout pannier /////////////////
const button = document.getElementById("bouton");

///////////////// Arborescence des balises //////////////////////
container.appendChild(figure);
figure.appendChild(h2);
figure.appendChild(img);
figure.appendChild(figcaption);
figcaption.appendChild(lenses);
figcaption.appendChild(price);
figcaption.appendChild(button);   

//////////////////// Ajouter produit au panier /////////////////
button.addEventListener ("click", function (){
const lenses = document.getElementsByTagName("select");
const lenseSelected = lenses[0].value;
addToBasket (lenseSelected);
alert("Produit ajouté au panier avec succès");
});
} 
//////////////////////////////// nombre d'articles et produit ajouté au local storage //////////////////
function addToBasket(lenseSelected) {
let basket = JSON.parse(localStorage.getItem("basketContents"));

    if (basket == null) {
     basket = [];
}
let product = new Product(id, lenseSelected);
basket.push(product);
localStorage.setItem ("basketContents",JSON.stringify(basket));

}  

