var data;
var letras = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var numeros = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var id;
var allShips = [];
var allSalvos = [];


shipCalls();
function shipCalls() {
    fetch(makeUrl(), {
        method: "GET",
        headers: {
        }
    }).then(function (response) {
        if (response.ok) {
            console.log(2);

            return response.json();
        }

    }).then(function (json) {
        data = json;
        console.log(data);
        allShips = data.Ships;
        allSalvos = data.Salvos;
        tableGames();
        printShips();
        printSalvos();


    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}
        function tableGames(){
        var contenido = document.getElementById("conte");
        var tabla   = document.createElement("table");
        var tblBody = document.createElement("tbody");

        for (var j = 0; j < letras.length; j++) {
        var hilera = document.createElement("tr");
            for (var i = 0; i < numeros.length; i++) {

                var celda = document.createElement("td");
                if(j==0){
                    celda.innerHTML = numeros[i];
                }
                if(i==0){
                    celda.innerHTML = letras[j];
                }
                celda.setAttribute("id", (letras[j] + numeros[i]));
                // celda.setAttribute("class", (letras[j] + numeros[i]));
                hilera.appendChild(celda);
            }
            tblBody.appendChild(hilera);
        }
        tabla.appendChild(tblBody);
        contenido.appendChild(tabla);
        tabla.setAttribute("border", "2");
        }
        function printShips(){
            for (var h = 0; h < allShips.length; h++) {
                for (var l = 0; l < allShips[h].location.length; l++){
                    var id = document.getElementById(allShips[h].location[l]);
                    id.classList.add("ships");
                }
            }
        }
        function printSalvos(){
            for (var h = 0; h < allSalvos.length; h++) {
                for (var l = 0; l < allSalvos[h].location.length; l++){
                    var id = document.getElementById(allSalvos[h].location[l]);
                    id.classList.add("salvos");
                    if(id.className == 'ships salvos'){
                        id.className = 'hit';
                    }
                }
    }
}

        function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
        function makeUrl() {
    id = getParameterByName("gp");
    return '/api/game_view/' + id;
}