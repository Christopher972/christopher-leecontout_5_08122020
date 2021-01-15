///////// stockage du panier dans une variable /////////

let  basketProduct = JSON.parse(localStorage.getItem("basketContents")) || []; 

//////////////////////////////// nombre d'articles et produit ajouté au local storage //////////////////

function addToBasket(lenseSelected, quantityProduct) {  
    let product = new Product(id, lenseSelected, quantityProduct);
    basketProduct.push(product);
    localStorage.setItem ("basketContents",JSON.stringify(basketProduct));
} 

////////////////// Affichage de l'état panier sur la page et dans l'onglet nav ///////////////

function showBasket(){

    if(basketProduct.length == 0 ){
        document.getElementById("emptyBasket").style.display ="block";
        console.log("le panier est vide");
    }else{
        document.getElementById("infoBasket").style.display ="block";
        let quantityBasket = document.getElementById("quantityBasket");
        quantityBasket.innerHTML = basketProduct.length;
        console.log("le panier est plein");
    }
}
showBasket();

///////// Suppression d'un article //////////

function deleteArticle(i){
    console.log("suppression article i :", i);
    basketProduct.splice(i, 1); //suppression de l'element i du tableau   
    localStorage.clear(); //on vide le storage avant de le mettre à jour
    localStorage.setItem("basketContents", JSON.stringify(basketProduct)); //mise à jour du panier sans l'élément i
    window.location.reload(); //////// Actualisation de la page  
}   