function createButton(data){
    // console.log(data)
    const newButton = document.createElement("button")
    newButton.innerHTML = data.affectSuccess +"<br>"+ data.affectApplication; 
    newButton.addEventListener('click', function(){
        map.flyTo([data.lat,data.lng], 8); 
    })
    const spaceForButtons = document.getElementById('storyButtons')
    // document.body.appendChild(newButton);
}


function createCards(data){
    console.log("This is the data from the createCards function: ")
    // console.log(data)

    const newCard = document.createElement("div")
    newCard.className = "card"
    const cardTitle = document.createElement("h3")
    cardTitle.innerHTML = "How Family Support Educational Attainment";

    const cardText = document.createElement("p")
    const question1 = document.createElement("h4")
    const question2 = document.createElement("h4")
    question1.innerHTML = "Family support in college?<br>" + data.affectSuccess
    question2.innerHTML = "Family support in applying?<br>" + data.affectApplication

    let formattedSurveyText = question1.innerHTML + "<br>" + question2.innerHTML
    cardText.innerHTML = formattedSurveyText
    console.log(formattedSurveyText)
    newCard.appendChild(cardTitle)
    newCard.appendChild(cardText)
    const spaceForCards = document.getElementById("spaceForCards")
    spaceForCards.appendChild(newCard)
}

function removeAllCards(){
    const spaceForCards = document.getElementById("spaceForCards")
    spaceForCards.innerHTML = ""
}

function reOpenChartAfterClickingOutside(){

}


window.onclick = function(event) {
    console.log(event.target)
    const targetDivToClose = document.getElementsByClassName("spaceForCards")
    if (!event.target in targetDivToClose) {
        if (cardsOpen == true){
            // targetDivToClose.style.display = "none";
        }
    }
  } 