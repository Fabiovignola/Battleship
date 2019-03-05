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
var salvoss;

shipCalls();
function shipCalls() {
    fetch(makeUrl(), {
        method: "GET",
        headers: {
        }
    }).then(function (response) {
        if (response.ok) {
            // console.log(2);
            return response.json();
        }
    }).then(function (json) {
        data = json;
        console.log(data);
        allShips = data.Ships;
        allSalvos = data.Salvos;
        salvoss = data.Salvos[0].Salvos;
        gamePl = data.Game.gamePlayers[0].id;
        console.log(gamePl);
        tableGameOne();
        tableGameDos();
        printShips();
        printSalvos();
        // alert("Aquì la tenès que llamar, marica")
        // shipList();
        opportunity();
        lose();
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
            shipList()
        })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });

}
function shipList() {
//
//     // var theButton = document.getElementById('play');
//     // var tds = document.getElementsByTagName("td");
//     // console.log(allS);
    var shipOne = allShips[0].location;
    var shipTwo = allShips[1].location;
    var shipThree = allShips[2].location;
    var shipFour = allShips[3].location;
    var shipFive = allShips[4].location;
    var nameOne = allShips[0].type;
    var nameTwo = allShips[1].type;
    var nameThree = allShips[2].type;
    var nameFour = allShips[3].type;
    var nameFive = allShips[4].type;

        var div = document.getElementById("lista");
        var ol = document.createElement("ol");

            if (shipOne == "") {
                console.log("falta el barco")
                alert("FALTAN BARCOS TRAMPOSO");
            }else{
                var li = document.createElement("li");
                ol.appendChild(li);
                div.appendChild(ol);
                li.innerHTML = nameOne;
            }
            if (shipTwo == "") {
                console.log("falta el barco")
                alert("FALTAN BARCOS TRAMPOSO");
            }else{
                var li = document.createElement("li");
                ol.appendChild(li);
                div.appendChild(ol);
                li.innerHTML = nameTwo;
            }
            if (shipThree == "") {
                console.log("falta el barco")
                alert("FALTAN BARCOS TRAMPOSO");
            }else{
                var li = document.createElement("li");
                ol.appendChild(li);
                div.appendChild(ol);
                li.innerHTML = nameThree;
            }
            if (shipFour == "") {
                console.log("falta el barco")
                alert("FALTAN BARCOS TRAMPOSO");
            }else{
                var li = document.createElement("li");
                ol.appendChild(li);
                div.appendChild(ol);
                li.innerHTML = nameFour;
            }
            if (shipFive == "") {
                console.log("falta el barco")
                alert("FALTAN BARCOS TRAMPOSO");
            }else{
                var li = document.createElement("li");
                ol.appendChild(li);
                div.appendChild(ol);
                li.innerHTML = nameFive;
            }

    // console.log(data);
}
function shipPush() {
    var tds = document.getElementsByTagName("td");
    var hola = [];
    LocationId = [];
    LocationIdTwo = [];
    LocationIdThree = [];
    LocationIdFour = [];
    LocationIdFive = [];

    for (var h = 0; h < tds.length; h++) {
        if (tds[h].className == "aircraft") {
            LocationId.push(tds[h].getAttribute("id"));
            shipObject.shipType = "aircraft";
            shipObject.location = LocationId;
        }
        if (tds[h].className == "destroyer") {
            LocationIdTwo.push(tds[h].getAttribute("id"));
            shipObjectTwo.shipType = "destroyer";
            shipObjectTwo.location = LocationIdTwo;
        }
        if (tds[h].className == "battleship") {
            LocationIdThree.push(tds[h].getAttribute("id"));
            shipObjectThree.shipType = "battleship";
            shipObjectThree.location = LocationIdThree;
        }
        if (tds[h].className == "submarine") {
            LocationIdFour.push(tds[h].getAttribute("id"));
            shipObjectFour.shipType = "submarine";
            shipObjectFour.location = LocationIdFour;
        }
        if (tds[h].className == "patrolboat") {
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
    var div = document.getElementById("lista");
    var ol = document.createElement("ol");
    if (allS[0].shipType == "") {
        console.log("falta el barco")
    }else{
        var li = document.createElement("li");
        li.innerHTML = allS[0].shipType;
    }
    if (allS[1].shipType == "") {
        console.log("falta el barco")
    }else{
        var liTwo = document.createElement("li");
        liTwo.innerHTML = allS[1].shipType;
    }
    if (allS[2].shipType == "") {
        console.log("falta el barco")
    }else{
        var liThree = document.createElement("li");
        liThree.innerHTML = allS[2].shipType;
    }
    if (allS[3].shipType == "") {
        console.log("falta el barco")
    }else{
        var liFour = document.createElement("li");
        liFour.innerHTML = allS[3].shipType;
    }
    if (allS[4].shipType == "") {
        console.log("falta el barco")
    }else{
        var liFive = document.createElement("li");
        liFive.innerHTML = allS[4].shipType;
    }
    ol.appendChild(li);
    ol.appendChild(liTwo);
    ol.appendChild(liThree);
    ol.appendChild(liFour);
    ol.appendChild(liFive);
    div.appendChild(ol);
    // var thisButton = document.getElementById("play");
    document.getElementById("play").style.display = "block";
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
    if(locationSalvo.length == 5){
        document.getElementById("turn").style.display = "block";
    }

}
function opportunity() {
    var div = document.getElementById("lista");
    var ol = document.createElement("ol");
    // var salvoss = allSalvos.Salvos;

    console.log(salvoss);
    for (var h = 0; h < salvoss.length; h++){
        var salvosTable = salvoss[h].turn;
        var li = document.createElement("li");
        li.innerHTML = "TURNO REALIZADO" + "" + ":" + "" + salvosTable;
    }
    // for (var t = 0; t < allShips.length; t++){
    //     var shipTyp = allShips[t].type;
    //     var liTwo = document.createElement("li");
    //     liTwo.innerHTML = shipTyp;
    // }
    ol.appendChild(li);
    // ol.appendChild(liTwo);
    div.appendChild(ol);
}
function lose() {
    var tab = document.getElementById("conte");
    var allTds = document.getElementsByTagName("td");
    var clasesTd = 0;

    for (var g = 0; g < allTds.length; g++){

        if(allTds[g].className == "hit"){
            clasesTd = clasesTd +1;
        }
    }
    if(clasesTd == 17){
        alert("YOU LOSE");
    }
}