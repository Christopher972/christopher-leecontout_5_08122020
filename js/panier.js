/////////// Stockage du ptix total dans une variable ////////

let total = 0;

/////////////Affichage des articles du panier dans la page/////////////

function addBasketProduct(camera, basketInfo){
     
    const tabLine = document.createElement('tr');

    const img = document.createElement('td');
    img.setAttribute('width','33%');
            
    const image = document.createElement('img');
    image.innerHTML = basketInfo.imageUrl;
    image.setAttribute('src', basketInfo.imageUrl);
    image.setAttribute('width','30%');
    img.appendChild(image);

    const name = document.createElement('td');
    name.innerHTML = basketInfo.name;

    const lenseSelected =document.createElement('td');
    lenseSelected.innerHTML = camera.lenses;

    const number = document.createElement('td');

    let less = document.createElement('i');    ///////// Ajout bouton quantité moins 
    less.setAttribute('class','quantityLess fas fa-caret-square-up');
    number.appendChild(less);
    
    let quantityProduct = document.createElement ('span');///////// Affichage quantité 
    quantityProduct.innerHTML = camera.quantity;
    quantityProduct.setAttribute('class','numberProduct d-flex justify-content-center');
    number.appendChild(quantityProduct);
    
    let more = document.createElement('i');     /////////// Ajout bouton quantité plus 
    more.setAttribute('class','quantityMore fas fa-caret-square-down');
    number.appendChild(more);
            
    const price = document.createElement ('td');
    price.innerHTML = basketInfo.price/100 + '€';
    
    const trash = document.createElement('td');

    const button = document.createElement('i');  //////// Ajout du bouton pour supprimer un élement du panier
    button.setAttribute('class','fas fa-trash-alt mt-2');
    button.setAttribute('data-id', camera.id);
    trash.appendChild(button);

    /////////// Pour retirer un article du panier ///////

    button.addEventListener('click', function(event){
        deleteArticle(event.target.id);
        alert('Un article a été supprimé dans votre panier')
    });

    ///////// Pour retirer une quantité dans le panier ///////

    less.addEventListener('click', function(){
        let lessQuantity = --camera.quantity;
        quantityProduct.innerHTML = camera.quantity;
        total -= basketInfo.price/100;
        totalPrice.innerHTML = total + '€';
        localStorage.setItem('basketContents', JSON.stringify(basketProduct));
        if(lessQuantity <= 1){
            document.querySelector('.quantityLess').style.display = 'none';
        }
        numberArticleNav()
    });


    ///////// Pour ajouter une quantité supplémentaire dans le panier //////

    more.addEventListener('click', function(){
        let moreQuantity = ++camera.quantity;
        quantityProduct.innerHTML = camera.quantity;
        total += basketInfo.price/100;
        totalPrice.innerHTML = total + '€';
        localStorage.setItem ('basketContents', JSON.stringify(basketProduct));
        if(moreQuantity > 1){
            document.querySelector('.quantityLess').style.display = 'inline';
        }
        numberArticleNav()
    });

    /////////// Arborescence des elements //////////

    const tbody = document.getElementById('basketArticle');
    tbody.appendChild(tabLine);
    tabLine.appendChild(img);
    tabLine.appendChild(name);
    tabLine.appendChild(lenseSelected)
    tabLine.appendChild(number);
    tabLine.appendChild(price);
    tabLine.appendChild(trash);

    const totalPrice = document.getElementById('totalPrice'); /////// Affichage prix total 
    total += basketInfo.price/100 * camera.quantity;
    totalPrice.innerHTML = total + '€';        
} 

//////////////// Récupération des articles /////////////

for(let i = 0; i< basketProduct.length; i++){
    get('cameras/' + basketProduct[i].id)
        .then(basketInfo=>{
            addBasketProduct(basketProduct[i], basketInfo);
        })  
        .catch(function(err){
            console.log(err);
            if (err === 0){
            alert('serveur Hors Service');
        }
    })
}

///////////////////// test de chaque input du formulaire ////////////////////////

function checkInputs(){
    document.getElementById('form').reportValidity();
}  
  
let formulaire = document.getElementById('form');
formulaire.addEventListener('submit', function(event){
    event.preventDefault();
    checkInputs();
    if(basketProduct.length == 0){
        alert('Votre panier est vide, veuillez sélectionner un article');
    }else{
        let name = document.getElementById('name').value;
        let firstname = document.getElementById('firstname').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
           
          
        ////////// création objet //////////
  
        let contact = new Contact(name, firstname, email, address, city);
          
        let products = [];
      
        for (let i = 0; i < basketProduct.length; i++){
            basketProduct[i].id;
            products.push(basketProduct[i].id);
        }
  
        /////////////// Envoie des données récupérées/////////
  
        let data = new Order(contact, products);
        post('cameras/order', data)
            .then(function(response){
                localStorage.setItem('order', JSON.stringify({ id: response.orderId, total: total, data }));
                alert('Formulaire envoyé'); 
                window.location.assign('confirmation.html');
            }).catch(function(err){
                console.log(err);
                if(err == 0){
                    alert('serveur Hors Service');
            }
        });
    localStorage.clear();
    }     
});  