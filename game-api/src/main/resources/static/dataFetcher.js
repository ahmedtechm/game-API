// Function to fetch all players and display them on the page
function fetchAndDisplayPlayers() {
    fetch("http://localhost:8080/api/v1/player")
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        let playerCards = document.getElementById("player-cards");
        playerCards.innerHTML = ""; // Clear the player cards
  
        parsedResponse.forEach((element) => {
          let playerCard = document.createElement("div");
          playerCard.classList.add("col-md-4", "mb-3");
  
          let cardContent = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">ID: ${element.id}</p>
                <button class="btn btn-primary btn-update" data-player-id="${element.id}">Update</button>
                <button class="btn btn-danger btn-delete" data-player-id="${element.id}">Delete</button>
              </div>
            </div>
          `;
          playerCard.innerHTML = cardContent;
          playerCards.appendChild(playerCard);
        });
      })
      .catch((error) => console.log("Error fetching players:", error));
  }
  
  // Function to add a new player
  function addPlayer() {
    let playerId = document.getElementById("playerId").value;
    let playerName = document.getElementById("name").value;
  
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
        fetchAndDisplayPlayers(); // Fetch and display players again after adding
      })
      .catch((error) => console.log("Error adding player:", error));
  }
  
  // Function to update an existing player
  function updatePlayer(playerId, playerName) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      id: playerId,
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
        fetchAndDisplayPlayers(); // Fetch and display players again after updating
      })
      .catch((error) => console.log("Error updating player:", error));
  }
  
  // Function to delete an existing player
  function deletePlayer(playerId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(`http://localhost:8080/api/v1/player/${playerId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        fetchAndDisplayPlayers(); // Fetch and display players again after deleting
      })
      .catch((error) => console.log("Error deleting player:", error));
  }
  
  // Add event listener for "Add Player" form submit
  let addPlayerForm = document.getElementById("add-player-form");
  addPlayerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addPlayer();
  });
  
  // Add event listener for "Update Player" and "Delete Player" buttons (event delegation)
  let playerCards = document.getElementById("player-cards");
  playerCards.addEventListener("click", (event) => {
    let target = event.target;
  
    if (target.classList.contains("btn-update")) {
      let playerId = target.dataset.playerId;
      let playerName = prompt("Enter the updated player name:");
      if (playerName !== null && playerName !== "") {
        updatePlayer(playerId, playerName);
      }
    } else if (target.classList.contains("btn-delete")) {
      let playerId = target.dataset.playerId;
      let confirmDelete = confirm("Are you sure you want to delete this player?");
      if (confirmDelete) {
        deletePlayer(playerId);
      }
    }
  });
  
  // Fetch and display all players when the page loads
  fetchAndDisplayPlayers();
  