// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':6}

// use the variables
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

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}