///////////// Crétation de la constante contenant L'Id /////////////

const params = new URLSearchParams( window.location.search);
const id = params.get("id");
    
///////////// Information du Produit dans le code HTML /////////

function addProduct(product){
    const container = document.getElementById("productFocus");
    
    const figure = document.createElement("figure");
    figure.setAttribute( "class","product offset-1 col-10 col-md-6 offset-md-3 mt-5 mb-5 p-3");

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

    ////////////////// Choix des lentilles /////////////////////////

    const lenses = document.getElementById("lenses-selected");

    const optionDefault = document.createElement("option");
    optionDefault.innerHTML ="Choisissez votre lentille";
    lenses.appendChild(optionDefault);

    for (let i=0; i< product.lenses.length; i++){
        const option = document.createElement("option");
        option.setAttribute("value", product.lenses[i]);
        option.innerHTML = product.lenses[i];
        lenses.appendChild(option);
    }   
      
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
        let lenses = document.getElementsByTagName("select");
        let lenseSelected = lenses[0].value;
        let quantityProduct = 1; 
        addToBasket (lenseSelected, quantityProduct);
        alert("Article ajouté au panier avec succès");
    });
} 
 
//////////// Appel du produit sélectionné ///////////

get("http://localhost:3000/api/cameras/" + id)
.then(function(product){
    addProduct(product);
})
    .catch(function (err){
    console.log (err);
    if (err == 0){
        alert ("serveur Hors Service");
    }
});