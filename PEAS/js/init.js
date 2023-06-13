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
    results.data.forEach(data => {
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
    // this line below combines your survey data with the circle options to style it
    let circleOptionsWithSurveyData = Object.assign(circleOptions,data)
    if(data['supportReceived']=="Yes"){
        circleOptionsWithSurveyData.fillColor="#0038a7" // changing the color of the circle based on the data
        yesSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptionsWithSurveyData))
    }
    if (data['supportReceived']=="No"){
        circleOptionsWithSurveyData.fillColor="#ce1127"
        noSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptionsWithSurveyData))
    }
    if (data['supportReceived']=="I am unsure."){
        circleOptionsWithSurveyData.fillColor="#fecb00"
        unsureSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptionsWithSurveyData))
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
    cardSpace.style.display = "block";
    layers.eachLayer(function(layer){
        // console.log(layer.options)
        createCards(layer.options)
        // createButton(layer.options.propeties)
    })
    cardsOpen = true;
    map.fitBounds(layers.getBounds(),{maxZoom : 10});
}

function addBaseMap(){
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    
        }).addTo(map);
}


initalize()