fetch("http://localhost:8080/api/v1/player")
.then((response) => {return response.json()})
.then((parsedResponse)=>{
    console.log(parsedResponse);
let lopobj = document.getElementById("lop");

parsedResponse.forEach(element =>{
    let newListItem = document.createElement("li");
    newListItem.textContent = element.name;
    lopobj.appendChild(newListItem);

});

})