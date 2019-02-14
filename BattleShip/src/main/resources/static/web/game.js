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
                celda.onclick = rotate;
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
    console.log(celda)
    var idCelda = celda.getAttribute("id");
    var letter = idCelda[0];
    var number = idCelda[1];
    var allTd = document.getElementsByTagName("td");
    number = Number(number);
    currentSize = Number(currentSize);
    var ten = 10;

    var placeShip = new Boolean(true);

    for (var i = 0; i < allTd.length ; i++) {
        if (allTd[i].classList.contains(currentShip)) {
            allTd[i].classList.remove(currentShip);
        }
        if(celda.className != ""){
            console.log("Alerta Hay Un Barco Implementado")
            placeShip = false;
            return;
        }
        if(celda.id == letter + ten){
            placeShip = false;
            return;
        }
    }
        if (idCelda.length == 1) {
        placeShip = false;
        return;
         }
            for (var h = 0; h < currentSize - 1; h++) {
                number = number + 1;
                var idCelda = letter + number;
                var printShip = document.getElementById(idCelda);
                console.log(celda.className)
                if (printShip.className != "") {
                    placeShip = false;
                    return;
                }
            }
            var numberCeld = Number(celda.getAttribute("id")[1])
                if (placeShip == true) {
                    for (var m = 0; m < currentSize - 1; m++) {
                        numberCeld = numberCeld + 1;
                        var idCeld = letter + numberCeld;
                        var printShipNew = document.getElementById(idCeld);
                        celda.className = (currentShip);
                        printShipNew.className = (currentShip);
                    }
                }
}

function rotate() {
    var celda = event.target;
    console.log(celda)
    var idCelda = celda.getAttribute("id");
    var letter = idCelda[0];
    var number = idCelda[1];
    var allTd = document.getElementsByTagName("td");
    number = Number(number);
    currentSize = Number(currentSize);
    var ten = 10;

    var letterSume = letter.charCodeAt();
    // console.log(letterSume)
    var x = String.fromCharCode(65)
    // console.log(x)

    var placeShip = new Boolean(true);

    for (var i = 0; i < allTd.length ; i++) {
        if (allTd[i].classList.contains(currentShip)) {
            allTd[i].classList.remove(currentShip);
        }
        if(celda.className != ""){
            console.log("Alerta Hay Un Barco Implementado")
            placeShip = false;
            return;
        }
        if(celda.id == letter + ten){
            number = 10;
        }
    }
    if (idCelda.length == 1) {
        placeShip = false;
        return;
    }
    for (var h = 0; h < currentSize - 1; h++) {
        letterSume = letterSume + 1;
        var y = String.fromCharCode(letterSume);
        // console.log(y)
        var idCelda = y + number;
        console.log(idCelda)
        var printShip = document.getElementById(idCelda);
        // console.log(celda.className)
        if (printShip.className != "") {
            placeShip = false;
            return;
        }
    }
    var letterSumeTwo = letter.charCodeAt();
    if (placeShip == true) {
        for (var m = 0; m < currentSize - 1; m++) {
            letterSumeTwo = letterSumeTwo + 1;
            var w = String.fromCharCode(letterSumeTwo);
            var idCeldT = w + number;
            var printShipNew = document.getElementById(idCeldT);
            celda.className = (currentShip);
            printShipNew.className = (currentShip);
        }
    }
}