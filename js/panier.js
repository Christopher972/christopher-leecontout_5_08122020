let total = 0; 
const basket = JSON.parse(localStorage.getItem("basketContents")); 

for(let i = 0; i< basket.length; i++){
    const id = basket[i].id; 
    let lenses = basket[i].lenses;
get("http://localhost:3000/api/cameras/" + id)
    .then(basket=>{
        addBasketProduct(basket,lenses);
    })   
    .catch(function (err){
        console.log (err);
        if (err === 0){
          alert ("serveur Hors Service");
        }
    });
    const totalPrice = document.getElementById("totalPrice");  
} 


////////////////// Affichage de l'état panier dans la page///////////////

function showBasket(){
    const basket = JSON.parse(localStorage.getItem("basketContents")); 
        if(basket.length == 0 ){
            document.getElementById("emptyBasket").style.display ="block";
            console.log("le panier est vide");
        }else{
            document.getElementById("infoBasket").style.display ="block";
            let quantityBasket = document.getElementById("quantityBasket");
            quantityBasket.innerHTML = basket.length;
            console.log("le panier est plein");
        }
}showBasket();


/////////////Affichage des articles du panier dans la page/////////////

function addBasketProduct(basket, lenses, ){
     
            const tabLine = document.createElement("tr");

            const img = document.createElement("td");
            img.setAttribute("width","33%");
            
            const image = document.createElement("img");
            image.innerHTML = basket.imageUrl;
            image.setAttribute("src", basket.imageUrl);
            image.setAttribute("width","20%");
            img.appendChild(image);

            const name = document.createElement("td");
            name.innerHTML = basket.name;

            const lenseSelected = document.createElement("td");
            lenseSelected.innerHTML = lenses ;
            
            const price = document.createElement ("td");
            price.innerHTML =basket.price/100 + "€";
             total +=  basket.price/100;

            const trash = document.createElement("td");

            const button = document.createElement("i");  //////// Ajout du bouton pour supprimer un élement du panier////////////
            button.setAttribute("class","fas fa-trash-alt mt-3");
            button.setAttribute("data-id", basket.id);
            trash.appendChild(button);

            button.addEventListener("click",function(event){
            deleteArticle(event.target.id);
            alert("Un article a été supprimé dans votre panier")
        
            });
            const tbody = document.getElementById("basketArticle");
            tbody.appendChild(tabLine);
            tabLine.appendChild(img);
            tabLine.appendChild(name);
            tabLine.appendChild(lenseSelected);
            tabLine.appendChild(price);
            tabLine.appendChild(trash);

            totalPrice.innerHTML =  total + "€";

        }  

function deleteArticle (i){
    console.log("suppression article i :", i);
    basket.splice(i, 1); //suppression de l'element i du tableau;  
    localStorage.clear(); //on vide le storage avant de le mettre à jour;
    localStorage.setItem("basketContents", JSON.stringify(basket)); //maj du panier sans l'élément i;
    window.location.reload();
}

////////////////////// Formulaire ////////////////////////

