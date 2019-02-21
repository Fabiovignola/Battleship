var data;
var letras = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var numeros = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var id;
var gameplayerID;
var allShips = [];
var allSalvos = [];
var currentShip = "";
var currentSize = "";
var dato;
var allS = [];
var shipObject = {shipType: "", location: ""};
var shipObjectTwo = {shipType: "", location: ""};
var shipObjectThree = {shipType: "", location: ""};
var shipObjectFour = {shipType: "", location: ""};
var shipObjectFive = {shipType: "", location: ""};

var LocationId = [];
var LocationIdTwo = [];
var LocationIdThree = [];
var LocationIdFour = [];
var LocationIdFive = [];

var locationSalvo = [];

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
        gamePl = data.Game.gamePlayers[0].id;
        console.log(gamePl);
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
                // celda.onclick = rotate;    LLAMAR A LA FUNCION....
                // celda.onclick = hori;
                celda.onclick = ShipImplement;
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
            celda.onclick = salvosTurn;
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
function ShipImplement() {
        console.log(dato);
    if(dato == "true"){
        console.log("horizontal")
        hori()
    }
    if(dato == "false"){
        console.log("vertical")
        verti()
    }
}
function checkHorizontal() {
    var x = event.target;
    dato = x.getAttribute("value");
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
function hori() {
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
    shipPush()
}
function verti() {
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
    shipPush()
}
function shipCreate() {
    fetch("/api/games/players/"+gamePl+"/ships", {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify([{shipType:"aircraft", location: LocationId},
                              {shipType:"destroyer", location: LocationIdTwo},
                              {shipType:"battleship", location: LocationIdThree},
                              {shipType:"submarine", location: LocationIdFour},
                              {shipType:"patrolboat", location: LocationIdFive}])
    })
        .then(function (response) {
            return response.json();            })
        .then(function (json) {
            console.log(json)
            location.reload()

        })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
}
function shipPush() {
    var tds = document.getElementsByTagName("td");
    var hola = [];
    LocationId = [];
    LocationIdTwo = [];
    LocationIdThree = [];
    LocationIdFour = [];
    LocationIdFive = [];

    for (var h = 0; h < tds.length; h++){
        if(tds[h].className == "aircraft"){
            LocationId.push(tds[h].getAttribute("id"));
            shipObject.shipType = "aircraft";
            shipObject.location = LocationId;
        }
        if(tds[h].className == "destroyer"){
            LocationIdTwo.push(tds[h].getAttribute("id"));
            shipObjectTwo.shipType = "destroyer";
            shipObjectTwo.location = LocationIdTwo;
        }
        if(tds[h].className == "battleship"){
            LocationIdThree.push(tds[h].getAttribute("id"));
            shipObjectThree.shipType = "battleship";
            shipObjectThree.location = LocationIdThree;
        }
        if(tds[h].className == "submarine"){
            LocationIdFour.push(tds[h].getAttribute("id"));
            shipObjectFour.shipType = "submarine";
            shipObjectFour.location = LocationIdFour;
        }
        if(tds[h].className == "patrolboat"){
            LocationIdFive.push(tds[h].getAttribute("id"));
            shipObjectFive.shipType = "patrolboat";
            shipObjectFive.location = LocationIdFive;
        }
    }
    hola.push(shipObject);
    hola.push(shipObjectTwo);
    hola.push(shipObjectThree);
    hola.push(shipObjectFour);
    hola.push(shipObjectFive);
    allS = hola;

    console.log(allS);
    // console.log(shipObject);
    // console.log(shipObjectTwo);
    // console.log(LocationId);
    // console.log(LocationIdTwo);


}
function salvosFetch() {
    fetch("/api/games/players/"+gamePl+"/salvos", {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({salvo: 1, location: locationSalvo})
    })
        .then(function (response) {
            return response.json();            })
        .then(function (json) {
            location.reload()
        })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
}
function salvosTurn() {
    var x = event.target;
    var turno;
    var placeShip = new Boolean(true);
    for (var h = 0; h < 5; h++){
        turno = x.getAttribute("id");
        idPure = turno.substring(1);
    }
    if(locationSalvo.length > 4){
        return;
    }
    if(locationSalvo.includes(idPure)){
        return;
    }
    if(idPure.length == 0 || idPure == 10 || idPure.length == 1) {
        return;
    }
    locationSalvo.push(idPure);
    console.log(x)
    console.log(idPure)
    console.log(locationSalvo)


}


