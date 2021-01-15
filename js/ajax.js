function get (url){
    const promise = new Promise (function (resolve){
        let request = new XMLHttpRequest ();
        request.open("GET", url);
        request.onreadystatechange = function(){
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
                resolve(JSON.parse(this.responseText));    
            } 
        };
        request.send();
    });
    return promise;
}



 //////////////////////////////////// Envoie des données à l'API//////////////////////////
 
function post (url,data){
    const promise = new Promise (function (resolve){
        let request = new XMLHttpRequest ();
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function(){
            if (this.readyState == 4 && this.status === 201){
                resolve(JSON.parse(this.responseText));   
            }
        };
        request.send (JSON.stringify(data));
    });
    return promise; 
}

 