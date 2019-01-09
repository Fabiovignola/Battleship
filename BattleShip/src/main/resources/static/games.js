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
        console.log(json);
        console.log(data);
        tableGames();

    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

function tableGames() {

    document.getElementById("Portal").innerHTML = "Games";
    var tab = document.getElementById("orderlist");
    for (var i = 0; i < data.length; i++){
        var list = document.createElement("li");
        var players = data[i].gamePlayers;
        for (var j = 0; j < players.length; j++){
            correo.push(players[j].player.email);
        }
        list.innerHTML = data[i].date + " : " + correo.splice(0,2);
        tab.appendChild(list);
    }
}

