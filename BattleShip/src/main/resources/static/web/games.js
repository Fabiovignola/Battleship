var data;
var correo = [];


gamesCalls();
function gamesCalls() {
    fetch("/api/games", {
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
        listGame();
        printScore();

    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

function listGame() {

    document.getElementById("Portal").innerHTML = "Games";
    var tab = document.getElementById("orderlist");
    var allGa = data.allGame;
    for (var i = 0; i < allGa.length; i++){
        var list = document.createElement("li");
        var players = allGa[i].gamePlayers;
        for (var j = 0; j < players.length; j++){
            correo.push(players[j].player.email);
        }
        list.innerHTML = allGa[i].date + " : " + correo.splice(0,2);
        tab.appendChild(list);
    }
}

function printScore() {
    var contenido = document.getElementById("tableScore");
    var tblBody = document.createElement("tbody");
    var allsco = data.allScores;
    var td = document.createElement("td");
    var tdos = document.createElement("td");
    var tdtres = document.createElement("td");
    var tdcuatro = document.createElement("td");
    var tdcinco = document.createElement("td");

    for (var i = 0; i < allsco.length; i++){
        var players = allsco[i].email;
        var truno = document.createElement("tr");
        var trdos = document.createElement("tr");
        var trtres = document.createElement("tr");
        var trcuatro = document.createElement("tr");
        var trcinco = document.createElement("tr");

        var play = allsco[i].player;
        var totalscore = play.total;
        var totalwin = play.win;
        var totalose = play.lose;
        var totaltied = play.tied;

        truno.innerHTML = players;
        trdos.innerHTML = totalscore;
        trtres.innerHTML = totalwin;
        trcuatro.innerHTML = totalose;
        trcinco.innerHTML = totaltied;

        td.appendChild(truno);
        tdos.appendChild(trdos);
        tdtres.appendChild(trtres);
        tdcuatro.appendChild(trcuatro);
        tdcinco.appendChild(trcinco);

        tblBody.appendChild(td);
        tblBody.appendChild(tdos);
        tblBody.appendChild(tdtres);
        tblBody.appendChild(tdcuatro);
        tblBody.appendChild(tdcinco);


    }
    contenido.appendChild(tblBody);
}


