
let mapOptions = {'center': [34.0709,-118.444],'zoom':6}
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(data){
    // console.log(data)
    L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data['Where is your hometown?']}</h2> <h3>${data['Describe how family support has affected your success in college.']}</h3> <h3>${data['Describe how family support affected your ability to apply for college.']}</h3>`)
    createButtons(data.lat,data.lng,data['Where is your hometown?'])
    return
}

function createButtons(lat,lng,title,marker){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function() { map.flyTo([lat,lng],7); })
    newButton.addEventListener('click', function() { marker.openPopup(); })
    const spaceForButtons = document.getElementById("buttons");
    spaceForButtons.appendChild(newButton);

    //if then here?

    newButton.style.fontSize = "12px";
    newButton.style.fontFamily = "";
    newButton.style.textAlign = "center";
    newButton.style.margin = "2px"
    newButton.style.paddingTop = "8px";
    newButton.style.paddingBottom = "8px";
    newButton.style.justifyContent = "center";
    newButton.style.width = "30%";
    newButton.style.cursor = "pointer";
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSn415MNwpNpFmQyxj2WbVnRJSDx85ki66G7zrcfeHpl8DSiErm9xD8psQxTwbPAzDLQeRMI8kF6eR/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}
function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
        //change marker to add more info??
    })
}

loadData(dataUrl)

document.getElementById("defaultOpen").click();