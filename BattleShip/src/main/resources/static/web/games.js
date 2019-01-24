var data;
var correo = [];
var usernamebutton= "";
var passwordbutton= "";
var showTable= "";
var darksing= "";

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
        loggedInPlayer();

    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}
function listGame() {

    document.getElementById("Portal").innerHTML = "BattleShip";
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

    for (var i = 0; i < allsco.length; i++){
        var td = document.createElement("tr");

        var players = allsco[i].email;
        var truno = document.createElement("td");
        var trdos = document.createElement("td");
        var trtres = document.createElement("td");
        var trcuatro = document.createElement("td");
        var trcinco = document.createElement("td");

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
        td.appendChild(trdos);
        td.appendChild(trtres);
        td.appendChild(trcuatro);
        td.appendChild(trcinco);

        tblBody.appendChild(td);

    }
    contenido.appendChild(tblBody);
}
function inputValue(){
    usernamebutton = document.getElementById("exampleInputEmail1").value;
    passwordbutton = document.getElementById("exampleInputPassword1").value;

}
function signIn(event){
    event.preventDefault()
    inputValue()
    fetch("/api/players", {

        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: 'userName='+ usernamebutton + '&password='+ passwordbutton,
    })
        .then(function (data) {
            return data.json();
        }).then(function (json) {
            console.log(json)
            logIn(event)

    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });

}
function logIn(event){
    event.preventDefault()
    inputValue()

    fetch("/api/login", {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'userName='+ usernamebutton + '&password='+ passwordbutton,
    })
        .then(function () {

        }).then(function () {
            location.reload()

    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });

}
function logOut(event){
    event.preventDefault()

    fetch("/api/logout", {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(function () {

        }).then(function () {
        location.reload()
    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
}
function loggedInPlayer(){
    if(data.player == null){
        darksing = document.getElementById("request");
        darksing.style.display = 'block';
    }else if(data.player != null){
        darksing = document.getElementById("request");
        darksing.style.display = 'none';
        showTable = document.getElementById("gamesHtml");
        showTable.style.display = 'block';
    }
}