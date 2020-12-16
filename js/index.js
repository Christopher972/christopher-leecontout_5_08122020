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

///////////// Information du Produit dans le code HTML /////////
function addProduct (responseProduct,section){
  const figure = document.createElement("figure") ;
  figure.innerHTML = responseProduct.name;
  figure.setAttribute ("class", "col-md-5 product mt-5 col-sm-6 mr-4 ml-4 border border-dark shadow");

  const img = document.createElement("img");
  img.setAttribute ("src", responseProduct.imageUrl);
  img.setAttribute ("width","100%");

  const figcaption = document.createElement("figcaption");
  figcaption.innerHTML = responseProduct.description;

  const lenses = document.createElement("p");
  lenses.innerHTML = "Choix des lentilles: " + responseProduct.lenses;

  const price = document.createElement("p");
  price.innerHTML = responseProduct.price + "€";
  price.setAttribute ("class","product_price");

  const link = document.createElement("a");
  link.setAttribute ("href","produit.html?id=" + responseProduct._id);

///////////////////////////////// Arborescence des balises////////////////////////////////////

  section[2].appendChild(figure);
  figure.appendChild(link);
  link.appendChild(img);
  figure.appendChild(figcaption);
  figcaption.appendChild(lenses);
  figcaption.appendChild(price);
}

///////////////////////////////////// Ajout d'une balise Figure/////////////////////////////////////////
function addFigureToFixDisplay(section){
  const figure= document.createElement("figure");
  figure.setAttribute = ("class","col-md-5 mt-5 mb-4 ml-4 mr-4 border border-dark shadow");
  section[2].appendChild(figure);
}
 
 get("http://localhost:3000/api/cameras")
  .then (function (response) {
    const section = document.getElementsByClassName("row");

////////////////////////////////////  Tableau des appareils photos /////////////////////////////////////
  for (let i=0; i< response.length; i++){
    addProduct (response[i], section);  
  }
  if (response.lenght % 2 === 1){
    addFigureTofixeDisplay(section);
  }
  })
  .catch(function (err){
    console.log (err);
    if (err === 0){
      alert ("serveur Hors Service");
    }
  });