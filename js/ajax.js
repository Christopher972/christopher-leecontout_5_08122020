const entrypointApi = 'http://localhost:3000/api/';//// Variable globale de l'url

////////////  Récupération des informations de l'API //////////

function get (url){
    const promise = new Promise(function(resolve, reject){
        let request = new XMLHttpRequest ();
        request.open('GET', entrypointApi + url );
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
                resolve(JSON.parse(this.responseText));    
            }else{
                if (this.readyState == XMLHttpRequest.DONE && this.status != 200){
                    reject(this.status);
                }
            } 
        };
        request.send();
    });
    return promise;
}

 //////////////////////////////////// Envoie des données à l'API//////////////////////////
 
 function post (url, data){
    const promise = new Promise(function(resolve, reject){
        let request = new XMLHttpRequest ();
        request.open('POST', entrypointApi + url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 201){
                resolve(JSON.parse(this.responseText));   
            }else{
                if (this.readyState == 4 && this.status != 201){
                    reject(this.status);
                } 
            }
        };
        request.send(JSON.stringify(data));
    });
    return promise; 
}

 