// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map);
    })

    // map points
    const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSn415MNwpNpFmQyxj2WbVnRJSDx85ki66G7zrcfeHpl8DSiErm9xD8psQxTwbPAzDLQeRMI8kF6eR/pub?output=csv"

    // create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
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
            addMarker(data.lat,data.lng,data['Where is your hometown?'],data['Do you feel that you received support from your family in higher education?'])
        })
    }
    
    loadData(dataUrl)

    // chart stuff testing
    let defaultChart = {
        "labels": ["Yes", "No", "Unsure"],
        "datasets": [],
        "colors":["#FFBCCE","#8FF0DE"],
        "chartname": "defaultchart",
        "title":"Recieved Family Support?"
    }
    
    function populateCharts(chartType,chartnumber){
        //resize map to fit screen
       console.log('populateCharts: '+chartType)
       console.log('populateCharts: '+chartnumber)
       switch (chartType){
           case 'Off-Campus Workers':
               currentData = currentData.filter(data=>data.inucla=='no')
               addChart(yearChart,currentData)
               map.fitBounds(offCampus.getBounds());
               map.removeLayer(onCampus)
               map.addLayer(offCampus)
               break;
           case 'On-Campus Workers':
               currentData = currentData.filter(data=>data.inucla=='yes')
               addChart(yearChart,currentData)
               map.fitBounds(onCampus.getBounds());
               map.removeLayer(offCampus)
               map.addLayer(onCampus)
               break;
           case 'Undergraduate':
               currentData = currentData.filter(data=>data.year=='Traditional Undergraduate')
               addChart(whyjobChart,currentData)
               addChart(complaintChart,currentData,2)
               break;
           case 'Graduate':
               currentData = currentData.filter(data=>data.year=='Graduate')
               addChart(whyjobChart,currentData)
               addChart(complaintChart,currentData,2)
               break;
           case 'Nontraditional Undergraduate':
               currentData = currentData.filter(data=>data.year=='Nontraditional Undergraduate')
               addChart(whyjobChart,currentData)
               addChart(complaintChart,currentData,2)
               break;
           case 'Post-Graduate':
               currentData = currentData.filter(data=>data.year=='Post-Grad')
               addChart(whyjobChart,currentData)
              addChart(complaintChart,currentData,2)
               break;
           // todo: add the rest of the cases here!
           // case 'Graduate':
               // 
           
           case 'defaultchart':
               addChart(defaultChart,currentData)
       }
   }