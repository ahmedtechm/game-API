fetch("http://localhost:8080/api/v1/player")
.then((response) => {return response.json()})
.then((parsedResponse)=>{
    console.log(parsedResponse);
    let lopobj = document.getElementById("lop");


parsedResponse.forEach(element =>{
    let newListItem = document.createElement("li"); 
    newListItem.className = "list-group-item";

let listItemHeading = document.createElement("h3");
listItemHeading.className = "card-title";
listItemHeading.textContent = "ID: " + element.id;

let listItemPara = document.createElement("p");
listItemPara.className = "card-description";
listItemPara.textContent = "Name: " + element.name;

newListItem.appendChild(listItemHeading);
newListItem.appendChild(listItemPara);

lopobj.appendChild(newListItem);


    });

})