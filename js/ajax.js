function get (url){
    const promise = new Promise (function (resolve,reject){
        const request = new XMLHttpRequest ();
        request.open("GET", url);
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status === 200){
                resolve(JSON.parse(request.responseText));    
            } 
        };
        request.send();
    });
    return promise;
}



 //////////////////////////////////// Envoie des données à l'API//////////////////////////
function post (url,JsonBody){
    const promise = new Promise (function (resolve,reject){
        const request = new XMLHttpRequest ();
        request.open("POST", url);
        request.setRequestHeader ("Content-Type", "application/json");
        request.onreadystatechange = function(){
            if (this.readyState === 4){
                if(this.status === 201){
                    resolve(JSON.parse(request.reponseText));
                } else {
                    reject (request.status);
                }
            }
        };
        request.send (Json.stringify (jsonBody));
    });
    return promise; 
}

 