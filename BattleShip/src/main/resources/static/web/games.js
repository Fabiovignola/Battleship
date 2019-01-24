var data;
var correo = [];
var usernamebutton= "";
var passwordbutton= "";

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
    signIn();
}
function signIn(){
    fetch("/api/players", {

        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: 'userName='+ usernamebutton + '&password='+ passwordbutton,
    })
        .then(function (data) {
            console.log('Request success: ', data);
        }).then(function () {
    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });

}
function logIn(){
    fetch("/api/login", {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'userName='+ usernamebutton + '&password='+ passwordbutton,
    })
        .then(r => {
        console.log(r)

}
)
}
function logOut(){
    fetch("/api/logout", {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(r => {
        console.log(r)})
}

