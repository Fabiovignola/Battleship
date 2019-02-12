var data;
var letras = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var numeros = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var id;
var gameplayerID;
var allShips = [];
var allSalvos = [];
var currentShip = "";
var currentSize = "";

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
        tableGameOne();
        tableGameDos();
        printShips();
        printSalvos();



    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}
function tableGameOne(){
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
                celda.onclick = as;
                // celda.setAttribute("class", (letras[j] + numeros[i]));
                hilera.appendChild(celda);
            }
            tblBody.appendChild(hilera);
        }
        tabla.appendChild(tblBody);
        contenido.appendChild(tabla);
        tabla.setAttribute("border", "2");
        }
function tableGameDos(){
    var contenido = document.getElementById("conteTwo");
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
            celda.setAttribute("id", (0 + letras[j] + numeros[i]));
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
function printSalvos() {
    console.log("all", allSalvos);
    for (var h = 0; h < allSalvos.length; h++) {
        var turn = allSalvos[h].Salvos;
        console.log(turn);
        for (var f = 0; f < turn.length; f++) {
            console.log("location", turn);
            for (var l = 0; l < turn[f].location.length; l++) {
                console.log("location2", turn[f].location[l]);
                console.log(turn[f].idGP);
                if (gameplayerID != turn[f].idGP) {
                    var id = document.getElementById(turn[f].location[l]);
                    id.classList.add("salvos");
                    if (id.className == 'ships salvos') {
                        id.className = 'hit';
                    }
                    }else if(gameplayerID == turn[f].idGP){
                        var id = document.getElementById(0 + turn[f].location[l]);
                        id.classList.add("salvos");
                        if (id.className == 'ships salvos') {
                            id.className = 'hit';
                    }
                }
            }
        }
    }
}
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
function makeUrl() {
    gameplayerID = getParameterByName("gp");
    return '/api/game_view/' + gameplayerID;
}
function shipDestroyer() {
    var aircraft = event.target;
    aircraft.getAttribute("data-type");
    currentShip = aircraft.getAttribute("data-type");
    currentSize = aircraft.getAttribute("data-size");
    console.log(aircraft.getAttribute("data-type"));
    ///////
    var battleship = event.target;
    battleship.getAttribute("data-type");
    currentShip = battleship.getAttribute("data-type");
    currentSize = battleship.getAttribute("data-size");
    console.log(battleship.getAttribute("data-type"));
    /////
    var submarine = event.target;
    submarine.getAttribute("data-type");
    currentShip = submarine.getAttribute("data-type");
    currentSize = submarine.getAttribute("data-size");
    console.log(submarine.getAttribute("data-type"));
    ///////
    var destroyer = event.target;
    destroyer.getAttribute("data-type");
    currentShip = destroyer.getAttribute("data-type");
    currentSize = destroyer.getAttribute("data-size");
    console.log(destroyer.getAttribute("data-type"));
    /////////////////
    var patrolboat = event.target;
    patrolboat.getAttribute("data-type");
    currentShip = patrolboat.getAttribute("data-type");
    currentSize = patrolboat.getAttribute("data-size");
    console.log(patrolboat.getAttribute("data-type"));
}
function as() {
    var celda = event.target;
    var idCelda = celda.getAttribute("id");
    var letter = idCelda[0];
    var number = idCelda[1];
    number = Number(number);
    currentSize = Number(currentSize);
    var allTd = document.getElementsByTagName("td");

    for (var i = 0; i < allTd.length ; i++) {
        if (allTd[i].classList.contains(currentShip)) {
            allTd[i].classList.remove(currentShip);
        }
        if(celda.className != ""){
            console.log("tiene clase")
        }
    }
        if (idCelda.length > 1) {
            for (var h = 0; h < currentSize - 1; h++) {
                number = number + 1;
                var idCelda = letter + number;
                var printShip = document.getElementById(idCelda);
                if( printShip.className == "") {
                    celda.className = (currentShip);
                    printShip.className = (currentShip);
                }else{
                    console.log("noooo")
                    return;
                }
            }
        }else
            {
        console.log("que nooo")}

}