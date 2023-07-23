// dataFetcher.js
document.addEventListener("DOMContentLoaded", function () {
    fetchPlayers();
});

function fetchPlayers() {
    fetch("http://localhost:8080/api/v1/player")
        .then((response) => response.json())
        .then((parsedResponse) => {
            console.log(parsedResponse);
            let lopObj = document.getElementById("lop");
            lopObj.innerHTML = ""; // Clear the list before adding updated players

            parsedResponse.forEach((element) => {
                let newListItem = document.createElement("li");
                newListItem.textContent = element.id + " -- " + element.name;
                lopObj.appendChild(newListItem);
            });
        })
        .catch((error) => console.log("error", error));
}

function addPlayer() {
    let playerId = document.getElementById("playerId").value;
    let playerName = document.getElementById("playerName").value;

    console.log(playerId);
    console.log(playerName);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        id: playerId,
        name: playerName,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/player", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            fetchPlayers(); // Update the player list after successful addition
        })
        .catch((error) => console.log("error", error));
}

function updatePlayer() {
    let playerId = document.getElementById("updatePlayerId").value;
    let playerName = document.getElementById("updatePlayerName").value;

    console.log(playerId);
    console.log(playerName);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        name: playerName,
    });

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(`http://localhost:8080/api/v1/player/${playerId}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            fetchPlayers(); // Update the player list after successful update
        })
        .catch((error) => console.log("error", error));
}

function deletePlayer() {
    let playerId = document.getElementById("deletePlayerId").value;

    console.log(playerId);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        id: playerId,
    });

    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(`http://localhost:8080/api/v1/player/${playerId}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            fetchPlayers(); // Update the player list after successful deletion
        })
        .catch((error) => console.log("error", error));
}


