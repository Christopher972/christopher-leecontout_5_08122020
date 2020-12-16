////////////////////////////////////////// API récupéré///////////////////////////////
function get (url){
    const promise = new Promise (function (resolve,reject){
        const request = new XMLHttpRequest ();
        request.open("GET", url);
        request.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE){
                if(this.status === 200){
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject (request.status);
                }
            }
        };
        request.send();
    });
    return promise;
  }

//////////////////////////////////////Caractéristique du produit (id + lentilles)//////////////
class Product{
    constructor(id,lenseSelected){
        this.id = id;
        this.lenses = lenseSelected;
    }
       
        
}

////////////////////////////////////// Id récupré dans l'url //////////////////////////////
function getId() {
    const param = document.location.search;
    const id = param.replace("?id=", ""); //// récupéré uniquement l'identifiant ////////
    return id;
}

///////////////////////////////////// Affichage du nombre d'articles dans le pannier ///////////////////
function addToBasket(lenseSelected) {
    let basketContents = JSON.parse(localStorage.getItem("basketContents"));
    if (basketContents === null) {
        basketContents = [];
    }

//////////////////////////////// produit ajouté au local storage //////////////////
    let product = new Product(id,lenseSelected);

    basketContents.push(product);
    localStorage.setItem ("basketContents",JSON.stringify(basketContents));
}

///////////// Information du Produit dans le code HTML /////////
function addProductInfo(response){
    const container = document.getElementById("focus_product");

    const figure = document.createElement("figure");
    figure.setAttribute( "class","product offset-1 col-10 col-md-6 offset-md-3 mt-5 mb-5 p-3 border border-dark shadow");

    const img = document.createElement("img");
    img.setAttribute ("src", response.imageUrl);
    img.setAttribute ("width","100%");

    const h2 = document.createElement("h2");
    h2.innerHTML = response.name;
    h2.setAttribute("class","product-title text-center mb-4 ");

    const figcaption =document.createElement("figacaption");
    figcaption.innerHTML = response.description;

    const price = document.createElement("p");
    price.innerHTML = response.price + "€";

/////////////////// Choix des lentilles /////////////////////////
    const lenses = document.createElement("select");

    const optionDefault = document.createElement("option");
    optionDefault.innerHTML = "Choisissez votre lentille";
    lenses.appendChild(optionDefault);

//////////////////// Bouton ajout pannier //////////////////

    const button = document.createElement("button");
    button.innerHTML ="Ajouter au panier";

///////////////////  Ajout d'élément au localStorage //////////
    button.addEventListener ("click", function (){
        const lenses = document.getElementsByTagName("select");
        const lenseSelected =lenses[0].value;

        addToBasket (lenseSelected);
        alert("produit ajouté au panier avec succès");
    });

    for (let i=0; i< response.lenses.length; i++){
        const option = document.createElement("option");
        option.setAttribute("value", response.lenses[i]);
        option.innerHTML =response.lenses[i];
        lenses.appendChild(option);
    }

///////////////// Arborescence des balises //////////////////////
    container.appendChild(figure);
    figure.appendChild(h2);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figcaption.appendChild(lenses);
    figcaption.appendChild(price);
    figcaption.appendChild(button); 
}

const id = getId();
get("http://localhost:3000/api/cameras/" + id)
    .then(function(response){
        addProductInfo(response);
    })
    .catch(function (err){
        console.log (err);
        if (err === 0){
          alert ("serveur Hors Service");
        }
    });