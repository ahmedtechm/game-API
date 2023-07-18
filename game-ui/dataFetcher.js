let lopobj = document.getElementById("lop");

// let newListItem = document.createElement("li");
// newListItem.textContent = "Dynamic"

// lopobj.appendChild(newListItem);

fetch("http://localhost:8080/api/v1/player")
.then((response) => {return response.json()})
.then((parsedResponse)=>{
    console.log(parsedResponse);
})