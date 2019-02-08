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
    var destroyer = event.target;
    destroyer.getAttribute("data-type");
    currentShip = destroyer.getAttribute("data-type");
    currentSize = destroyer.getAttribute("data-size");
    console.log(destroyer.getAttribute("data-type"));


}
function as() {
    var celda = event.target;
    console.log(celda)
    console.log(currentShip)
    console.log(currentSize)
    celda.classList.add("barcos");
    var idCelda = celda.getAttribute("id");
    console.log(idCelda)

    var letter = idCelda[0];
    var number = idCelda[1];
     number = Number(number);
     console.log(number);
    currentSize = Number(currentSize);
    console.log(currentSize);
    for (var h = 0; h < currentSize -1 ; h++) {
        number = number + 1;
        console.log(number);
        var idCelda = letter + number;

        console.log(idCelda);
        var printShip = document.getElementById(idCelda);
        // printShip.className.remove("barcos");

        console.log(printShip);
         var bar = printShip.className = ("barcos");

        // var pp = printShip.style.backgroundImage = "url('ss.jpg')";
        // printShip.style.backgroundImage = " ";

    }
    if(bar != null){
        printShip.className = ("clear");
    }

}