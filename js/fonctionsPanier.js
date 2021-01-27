///////// stockage du panier dans une variable /////////

let  basketProduct = JSON.parse(localStorage.getItem('basketContents')) || []; 

//////////////////////////////// nombre d'articles et produit ajouté au local storage //////////////////

function addToBasket(quantityProduct){  
    let product = new Product(id, quantityProduct);
    basketProduct.push(product);
    localStorage.setItem('basketContents', JSON.stringify(basketProduct));
} 

///////////////// Affichage état panier : panier vide ou tableau articles /////

function numberArticleNav(){
    let quantityBasket = document.getElementById('quantityBasket');
    if(quantityBasket === null){
        return;
    }
    if(basketProduct == 0){
        quantityBasket.innerHTML = '0';
        document.getElementById('emptyBasket').style.display = 'block';
        console.log('le panier est vide');
    }else{
        let numberArticle = 0;
        document.getElementById('infoBasket').style.display = 'block';
        JSON.parse(localStorage.getItem('basketContents')).forEach((camera)=>{
            numberArticle += parseInt(camera.quantity);
            quantityBasket.textContent = numberArticle;
           
        });
        
        console.log('le panier est plein');
    }
}
numberArticleNav();

///////// Suppression d'un article //////////

function deleteArticle(i){
    basketProduct.splice(i, 1); //suppression de l'element i du tableau   
    localStorage.clear(); //on vide le storage avant de le mettre à jour
    localStorage.setItem('basketContents', JSON.stringify(basketProduct)); //mise à jour du panier sans l'élément i
    window.location.reload(); //////// Actualisation de la page  
}   
