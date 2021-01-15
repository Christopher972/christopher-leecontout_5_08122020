function addOrderPage(){
    const order = JSON.parse(localStorage.getItem("order")); // récuperation de l'ID dans le local storage
    const confirmation = document.getElementById("sectionConfirmation");
    const message = document.createElement("h3");
    const price = document.createElement("h3");
    message.innerHTML = "Votre commande n° " + order.id;
    price.innerHTML = "Prix total de votre commande: " + order.total + "€";
    message.setAttribute("class", "confirmation-title, text-center");
    price.setAttribute( "class","confirmation-Price, text-center pt-4");

////////////// Arborescence//////////////
    confirmation.appendChild(message);
    confirmation.appendChild(price);

    localStorage.clear(); 
}
addOrderPage();
