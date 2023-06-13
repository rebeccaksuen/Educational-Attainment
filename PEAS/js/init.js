// ===========Functions================


function initalize(){
    loadData(dataUrl)
    addBaseMap()
}

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
        filterSupportResponses(data.supportReceived)
    })
    addChart();
    yesSupport.addTo(map)
    noSupport.addTo(map)
    unsureSupport.addTo(map)
    let allLayers = L.featureGroup([yesSupport,noSupport,unsureSupport]);
    map.fitBounds(allLayers.getBounds());
}


// create a function to add markers & layer stuff
function addMarker(data){
    if(data['supportReceived']=="Yes"){
        circleOptions.fillColor="#0038a7"
        yesSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptions))
    }
    if (data['supportReceived']=="No"){
        circleOptions.fillColor="#ce1127"
        noSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptions))
    }
    if (data['supportReceived']=="I am unsure."){
        circleOptions.fillColor="#fecb00"
        unsureSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptions))
    }
    createButton(data)
    return data
}  
// pie chart stuff UNDER HERE
// toggle variables - variables - supportReceived (red), supportNotReceived (blue), supportUnsure (yellow)

function filterSupportResponses(supportResponse){
    if (supportResponse=="Yes"){
        supportReceived +=1
        return
    }
    if (supportResponse=="No"){
        supportNotReceived +=1
        return
    }
    if (supportResponse=="I am unsure."){
        supportUnsure +=1
        return
    }
};

// when toggle -> pop up corresponding responses and a back button? corresponding layer changes on map too
// so need if then for the function

// 1. making the buttons that will pop up with the responses on them
function createButton(data){
    console.log(data)
    const newButton = document.createElement("button")
    newButton.innerHTML = data.affectSuccess +"<br>"+ data.affectApplication; 
    newButton.addEventListener('click', function(){
        map.flyTo([data.lat,data.lng], 8); 
    })
    const spaceForButtons = document.getElementById('storyButtons')
    document.body.appendChild(newButton);
}

        // 1. filter results by clicking on pie slice
        // 2. hide pie chart on click 
            //2b. display responses
        // 3. return to pie chart display by clicking outside

function onlyShowClickedLayer(layers){ // 1. filter results on map
    map.eachLayer(function (layers) {
        map.removeLayer(layers);
        
    });
    addBaseMap()
    map.addLayer(layers);
    map.fitBounds(layers.getBounds(),{maxZoom : 10});
}

function addBaseMap(){
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
}

// #2a hide pie chart (in createCharts.js)
// #2b show button responses
function clickShowResponses(storyButtons){
    var buttons = document.getElementById('storyButtons').hidden = true;
    buttons.style.display = "none";
}



initalize()